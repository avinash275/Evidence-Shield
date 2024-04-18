import {React,useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas"; // For generating PDF
import { saveAs } from "file-saver"; // For downloading PDF
import jsPDF from "jspdf";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwYzJmOTU3Mi1hMmZjLTQ3NzQtYThmMS1kNzQ1YmJjODE1MzMiLCJlbWFpbCI6ImF2aW5hc2h2aTI3NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDkzOGY3NDVlZGExNjgyNmRhYjUiLCJzY29wZWRLZXlTZWNyZXQiOiI2NTBhMjM4Y2U1YjBkOGY1NDRmNjQ4MThkY2I0YWI4YmU0MTU3MTJmYjU1MzUxOWJjOWU2Yjg4M2E2MjE4YWNkIiwiaWF0IjoxNzA4MzE3ODEyfQ.On6oUAvkDbZAnwM6SI-tWUoearXM4BiR-YgsNl8qcEU";

  const notifyA = (msg) => {
    toast.error(msg);
  };

  const notifyB = (msg) => {
    toast.success(msg);
  };
export default function FinalCertificate({statement,result,index}) {
  const caseid=parseInt(index)+1;

  const [reportIpfsHash,setReportIpfsHash]=useState("");

  const generatePDF = () => {
    const certificateElement = document.getElementById("certificate");

    html2canvas(certificateElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("certificate.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  
  const uploadToServer = () => {
    const certificateElement = document.getElementById("certificate");
    html2canvas(certificateElement)
      .then((canvas) => {
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("file", blob, "certificate.pdf");
          const pinataMetadata = JSON.stringify({
            name: "File name",
          });
          formData.append("pinataMetadata", pinataMetadata);
    
          const pinataOptions = JSON.stringify({
            cidVersion: 0,
          });
          formData.append("pinataOptions", pinataOptions);
    
          const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
              maxBodyLength: "Infinity",
              headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: `Bearer ${JWT}`,
              },
            }
          );
          if (res.data.IpfsHash) {
            notifyB("successfully ipfsHash generated ", res.data.ipfsHash);
            setReportIpfsHash(res.data.IpfsHash);
          }
        });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  useEffect(() => {
    if (reportIpfsHash) {
      fetch("http://localhost:8080/addCourtReport", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseID: caseid,
          ipfsHash: reportIpfsHash,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.error) {
            console.log(data.error);
          }
          {
            console.log("data is:", data);
            notifyB("successfully added", data);
            // window.location.reload();
          }
        })
        .catch((error) => {
          notifyA("error occured", error);
        });
    }
  }, [reportIpfsHash]);
  return (
    <div>
      {result && statement &&(<>
      <div id="certificate" className="certificate" >
        <h3>Certificate of Court's Verdict</h3>

        <div>
          caseid :{caseid}
          <br />
          Name:{result.res.name}
          <br />
          Complaint Description:{result.res.description}
          <br />
          Court final statement: {statement}
          <br />
        </div>
        
      </div>
      <button onClick={generatePDF}>Download Certificate</button>
      <button onClick={uploadToServer}>upload Certificate</button>
      </>)}
    </div>
  );
}
