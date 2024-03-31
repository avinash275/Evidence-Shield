import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./CheckCases.css";
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

async function getComplaintDetails(caseID) {
  try {
    const res = await fetch("http://localhost:8080/retrieveJSON", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseID: caseID,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in getComplaintDetails");
    throw error;
  }
}

async function getUploadedEvidencesComplainant(caseID) {
  try {
    const res = await fetch(
      "http://localhost:8080/getComplainantUploadedEvidences",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseID: caseID,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in getUploadedEvidences:", error);
    throw error;
  }
}

// changes made here

async function getUploadedEvidences(caseID) {
  try {
    const res = await fetch("http://localhost:8080/getPoliceEvidences", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseID: caseID,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in getUploadedEvidences:", error);
    throw error;
  }
}
async function getCourtReport(caseID) {
  try {
    const res = await fetch("http://localhost:8080/retrieveCourtReport", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseID: caseID,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in getCourtReport:", error);
    throw error;
  }
}

async function getPoliceReport(caseID) {
  try {
    const res = await fetch("http://localhost:8080/retrievePoliceReport", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseID: caseID,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in getPoliceReport:", error);
    throw error;
  }
}

async function getUploadedReportLab(caseID) {
  try {
    const res = await fetch("http://localhost:8080/getLabReports", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseID: caseID,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in getPoliceReport:", error);
    throw error;
  }
}

async function getUploadedReportHospital(caseID) {
  try {
    const res = await fetch("http://localhost:8080/getHospitalReports", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseID: caseID,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error occurred in get Hospital Reports:", error);
    throw error;
  }
}

export default function CheckCases() {
  const Navigate = useNavigate();
  const [caseIDs, setCaseIDs] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const [uploadedEvidencesComplainant, setUploadedEvidencesComplainant] =
    useState([]);
  const [uploadedEvidences, setUploadedEvidences] = useState([]);
  const [uploadedReport, setUploadedReport] = useState([]);

  const [uploadedReportLab, setUploadedReportLab] = useState([]);
  const [uploadedReportHospital, setUploadedReportHospital] = useState([]);
  const [uploadedReportCourt, setUploadedReportCourt] = useState([]);

  const [Document, setDocument] = useState("");
  const [reportIpfsHash, setReportIpfsHash] = useState("");
  const [caseid, setcaseid] = useState("");

  //hospital report
  useEffect(() => {
    async function fetchUploadedEvidences() {
      const evidences = [];
      for (let i = 0; i < caseIDs.length; i++) {
        try {
          const uploadedEvidence = await getUploadedReportHospital(i + 1);
          console.log("uploaded evidence:", uploadedEvidence.result);
          evidences.push(uploadedEvidence.result);
        } catch (error) {
          console.error(
            "Error fetching uploaded evidence for case ID:",
            caseIDs[i],
            error
          );
        }
      }
      setUploadedReportHospital(evidences);
      console.log("uploaded reports are :", uploadedReportHospital);
    }
    if (caseIDs.length > 0) {
      fetchUploadedEvidences();
    }
  }, [caseIDs]);

  //lab report
  useEffect(() => {
    async function fetchUploadedEvidences() {
      const evidences = [];
      for (let i = 0; i < caseIDs.length; i++) {
        try {
          const uploadedEvidence = await getUploadedReportLab(i + 1);
          console.log("uploaded evidence:", uploadedEvidence.result);
          evidences.push(uploadedEvidence.result);
        } catch (error) {
          console.error(
            "Error fetching uploaded evidence for case ID:",
            caseIDs[i],
            error
          );
        }
      }
      setUploadedReportLab(evidences);
      console.log("uploaded reports are :", uploadedReport);
    }
    if (caseIDs.length > 0) {
      fetchUploadedEvidences();
    }
  }, [caseIDs]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/getAllCaseIds", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCaseIDs(data.result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchComplaintDetails() {
      const details = await Promise.all(
        caseIDs.map(async (caseID) => {
          try {
            const complaintDetail = await getComplaintDetails(caseID);
            console.log("complaint details", complaintDetail);
            return complaintDetail; // Make sure to return the detail
          } catch (error) {
            console.error(
              "Error fetching complaint details for case ID:",
              caseID,
              error
            );
            return null;
          }
        })
      );
      setComplaints(details.filter(Boolean));
    }
    if (caseIDs.length > 0) {
      fetchComplaintDetails();
    }
  }, [caseIDs]);

  //police evidences
  useEffect(() => {
    async function fetchUploadedEvidences() {
      const evidences = [];
      for (let i = 0; i < caseIDs.length; i++) {
        try {
          const uploadedEvidence = await getUploadedEvidences(i + 1);
          console.log("uploaded evidence:", uploadedEvidence);
          evidences.push(uploadedEvidence);
        } catch (error) {
          console.error(
            "Error fetching uploaded evidence for case ID:",
            caseIDs[i],
            error
          );
        }
      }
      setUploadedEvidences(evidences);
    }
    if (caseIDs.length > 0) {
      fetchUploadedEvidences();
    }
  }, [caseIDs]);

  //police report
  useEffect(() => {
    async function fetchUploadedEvidences() {
      const evidences = [];
      for (let i = 0; i < caseIDs.length; i++) {
        try {
          const uploadedEvidence = await getPoliceReport(i + 1);
          console.log("uploaded evidence:", uploadedEvidence);
          evidences.push(uploadedEvidence);
        } catch (error) {
          console.error(
            "Error fetching uploaded evidence for case ID:",
            caseIDs[i],
            error
          );
        }
      }
      setUploadedReport(evidences);
      console.log("uploaded reports are :", uploadedReport);
    }
    if (caseIDs.length > 0) {
      fetchUploadedEvidences();
    }
  }, [caseIDs]);
  //Court report
  useEffect(() => {
    async function fetchUploadedEvidences() {
      const evidences = [];
      for (let i = 0; i < caseIDs.length; i++) {
        try {
          const uploadedEvidence = await getCourtReport(i + 1);
          console.log("uploaded evidence:", uploadedEvidence);
          evidences.push(uploadedEvidence);
        } catch (error) {
          console.error(
            "Error fetching uploaded evidence for case ID:",
            caseIDs[i],
            error
          );
        }
      }
      setUploadedReportCourt(evidences);
      console.log("uploaded reports are :", uploadedReport);
    }
    if (caseIDs.length > 0) {
      fetchUploadedEvidences();
    }
  }, [caseIDs]);

  //nako ahe
  useEffect(() => {
    async function fetchUploadedEvidences() {
      const evidences = [];
      if (caseIDs && caseIDs.length > 0) {
        for (let i = 0; i < caseIDs.length; i++) {
          try {
            const uploadedEvidence = await getUploadedEvidencesComplainant(
              caseIDs[i]
            ); // Fix the index
            // console.log("uploaded evidence:", uploadedEvidence);
            evidences.push(uploadedEvidence);
          } catch (error) {
            console.error(
              "Error retrieving uploaded evidence for case ID:",
              caseIDs[i],
              error
            );
          }
        }
        setUploadedEvidencesComplainant(evidences);
      }
    }
    fetchUploadedEvidences();
  }, [caseIDs]);

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

  const postReportDetails = async (index) => {
    try {
      const formData = new FormData();
      formData.append("file", Document);

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
        setcaseid(index);
        setReportIpfsHash(res.data.IpfsHash);
      }
    } catch (error) {
      console.log("error occurred", error);
      throw error;
    }
  };
  const [certificateData, setCertificateData] = useState({
    recipientName: "John Doe",
    courseName: "React Certification",
    date: new Date().toLocaleDateString(),
  });

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
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("file", blob, "certificate.pdf");
          axios
            .post("/upload-certificate", formData)
            .then((response) => {
              console.log("Certificate uploaded successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error uploading certificate:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="viewComplaints">
      <div className="table-responsive">
        {complaints.length > 0 && (
          <div className="table">
            <table className="table table-bordered table-hover table-align-middle">
              <thead className="table-secondary table align-top">
                <tr>
                  <th scope="col">CaseId</th>
                  <th scope="col">Location</th>
                  <th scope="col">Complainant Name</th>
                  <th scope="col">Complaint Description</th>
                  <th scope="col">Evidences</th>
                  <th scope="col"> Police Evidences</th>
                  <th scope="col"> Investigation Reports</th>
                  <th scope="col"> Lab Reports</th>
                  <th scope="col"> Hospital Feedback</th>
                  <th scope="col"> Complainant's Later Uploaded</th>
                  <th scope="col"> Upload Court's Verdict</th>
                  <th scope="col"> Court's Verdict</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((result, index) => (
                  <tr key={index}>
                    <td>{caseIDs[index]}</td>
                    <td>{result && result.res && result.res.location}</td>
                    <td>{result && result.res && result.res.name}</td>
                    <td>{result && result.res && result.res.description}</td>
                    <td>
                      {result &&
                        result.res &&
                        result.res.evidences &&
                        result.res.evidences.map((data, index) => (
                          <Link
                            key={index}
                            to={`https://gateway.pinata.cloud/ipfs/${data.ipfsHash}`}
                          >
                            <button className="view-document-button">
                              Complainant Evidence {index + 1}
                              <span role="img" aria-label="View Document">
                                {" "}
                              </span>
                            </button>
                            <br />
                            <br />
                          </Link>
                        ))}
                    </td>

                    <td>
                      {uploadedEvidences[index] &&
                        uploadedEvidences[index].result.map(
                          (evidence, idx) =>
                            evidence &&
                            evidence.trim() !== "" && (
                              <Link
                                key={idx}
                                to={`https://gateway.pinata.cloud/ipfs/${evidence}`}
                              >
                                <button className="view-document-button">
                                  Police Evidence {idx + 1}
                                  <span role="img" aria-label="View Document">
                                    {" "}
                                  </span>
                                </button>
                                <br />
                              </Link>
                            )
                        )}
                    </td>

                    <td>
                      {uploadedReport[index] && uploadedReport[index].res && (
                        <Link
                          to={`https://gateway.pinata.cloud/ipfs/${uploadedReport[index].res}`}
                        >
                          <button className="view-document-button">
                            Police Report
                            <span role="img" aria-label="View Document">
                              {" "}
                            </span>
                          </button>
                          <br />
                        </Link>
                      )}
                    </td>
                    <td>
                      {uploadedReportLab[index] ==
                      "No lab reports available for this case." ? (
                        <></>
                      ) : (
                        <>
                          <Link
                            to={`https://gateway.pinata.cloud/ipfs/${uploadedReportLab[index]}`}
                          >
                            <button className="view-document-button">
                              Lab Report
                              <span role="img" aria-label="View Document">
                                {" "}
                              </span>
                            </button>
                          </Link>
                        </>
                      )}
                    </td>
                    <td>
                      {uploadedReportHospital[index] && (
                        <Link
                          to={`https://gateway.pinata.cloud/ipfs/${uploadedReportHospital[index]}`}
                        >
                          <button className="view-document-button">
                            Hospital Report
                            <span role="img" aria-label="View Document">
                              {" "}
                            </span>
                          </button>
                          <br />
                        </Link>
                      )}
                    </td>
                    <td>
                      {uploadedEvidencesComplainant.length > 0 ? (
                        <>
                          {uploadedEvidencesComplainant[index].result.map(
                            (evidence, idx) =>
                              evidence &&
                              evidence.trim() !== "" && (
                                <Link
                                  key={idx}
                                  to={`https://gateway.pinata.cloud/ipfs/${evidence}`}
                                >
                                  <button className="view-document-button">
                                    New Evidence {idx}
                                    <span role="img" aria-label="View Document">
                                      {" "}
                                    </span>
                                  </button>
                                  <br />
                                </Link>
                              )
                          )}
                        </>
                      ) : (
                        <>{uploadedEvidencesComplainant.length}</>
                      )}
                    </td>

                    <td style={{ width: "10px" }}>
                      <input type="text" placeholder="Enter final Statement" />
                      <div>
                        <div id="certificate">
                          <h1>Certificate of Completion</h1>
                          <p>This is to certify that</p>
                          <p>{certificateData.recipientName}</p>
                          <p>has successfully completed the course</p>
                          <p>{certificateData.courseName}</p>
                          <p>dated {certificateData.date}</p>
                        </div>
                        <button onClick={generatePDF}>
                          Download Certificate
                        </button>
                        <button onClick={uploadToServer}>
                          Upload Certificate
                        </button>
                      </div>

                      <input
                        type="file"
                        onChange={(event) => {
                          setDocument(event.target.files[0]);
                        }}
                      />
                      <button
                        className="button"
                        onClick={() => {
                          if (Document) {
                            postReportDetails(index + 1);
                          }
                        }}
                      >
                        {Document ? "upload" : "select"}
                      </button>
                    </td>
                    <td>
                      {uploadedReportCourt[index] &&
                        uploadedReportCourt[index].res && (
                          <Link
                            to={`https://gateway.pinata.cloud/ipfs/${uploadedReportCourt[index].res}`}
                          >
                            <button className="view-document-button">
                              Court Report
                              <span role="img" aria-label="View Document">
                                {" "}
                              </span>
                            </button>
                            <br />
                          </Link>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          Navigate("/court");
        }}
      >
        Back
      </button>
    </div>
  );
}
