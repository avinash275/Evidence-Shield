import React, { useEffect, useState } from "react";

import "./TrackYourComplaint.css";
import { useNavigate } from "react-router-dom";

export default function TrackYourComplaint() {
  const Navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(false);
  const [caseID, setCaseID] = useState("");
  const [result, setResult] = useState("");
  const [remainPercent, setPercent] = useState(0);
  const [police, setPolice] = useState(false);
  const [hospital, setHospital] = useState(false);
  const [lab, setLab] = useState(false);
  const [court, setCourt] = useState(false);

  const fetchCaseStatus = async () => {
    try {
      const response = await fetch("http://localhost:8080/getCaseStatus", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseID: caseID,
        }),
      });
      const data = await response.json();
      console.log(data);
      setResult(data); // Set the result
      if (data.result == 30) {
        setPolice(true);
      } else if (data.result == 50) {
        setPolice(true);
        setLab(true);
      } else if (data.result == 70) {
        setPolice(true);
        setLab(true);
        setHospital(true);
      } else if (data.result == 100) {
        setPolice(true);
        setLab(true);
        setHospital(true);
        setCourt(true);
      }
      setPercent(100 - parseInt(data.result)); // Calculate remaining percentage
      setIsAvailable(true); // Update isAvailable to true
    } catch (error) {
      console.error("Error fetching case status:", error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(inputValue)) {
      setCaseID(inputValue);
    }
  };

  return (
    <div className="trackYourComplaint">
      {!isAvailable ? (
        <div className="boxesTrack">
          <div className="my-3">Enter Your Case Id:</div>
          <input
            type="text"
            value={caseID}
            onChange={handleInputChange}
          />
          <button className="my-3" onClick={fetchCaseStatus}>
            Request For Status
          </button>
          <button
            onClick={() => {
              Navigate("/complainantPage");
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="boxesTrack">
          <div className="caseId">
            <h1>
              Case ID : <strong>{caseID}</strong>
            </h1>
          </div>

          <div className="heading">
            <h3>Case Status:</h3>
          </div>
          <div>
            {result.result > 0 ? (
              <div className="caseStatus">
                <div
                  className="leftSection"
                  style={{ width: `${result.result}%` }}
                >
                  {result.result}%
                </div>
                <div
                  className="rightSection"
                  style={{ width: `${remainPercent}%` }}
                >
                  {remainPercent}%
                </div>
              </div>
            ) : (
              <>No Update Yet</>
            )}
          </div>
          <button
            className="my-3 mx-3"
            onClick={() => {
              setIsAvailable(false);
            }}
          >
            Back
          </button>
          <div>
            {court ? (
              <div>
                <div>Police Reported To Case </div>
                <div>Lab Reported To Case</div>
                <div>Hospital Reported To Case</div>
                <div>Court Uploaded their Final Verdict</div>
              </div>
            ) : (
              <>
                {hospital ? (
                  <div>
                    <div>Police Reported To Case </div>
                    <div>Lab Reported To Case</div>
                    <div>Hospital Reported To Case</div>
                  </div>
                ) : (
                  <>
                    {lab ? (
                      <div>
                        <div>Police Reported To Case </div>
                        <div>Lab Reported To Case</div>
                      </div>
                    ) : (
                      <>
                        {police ? (
                          <div>
                            <div>Police Reported To case</div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
