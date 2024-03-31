import React, { useState, useEffect } from "react";
import "./Home.css";
import image from "./images/1.png";
import image2 from "./images/8.avif";
import domesticViolence from "./images/domesticViolence.png";
import acidAttack from "./images/acidAttack.jpeg";
import Rape from "./images/Rape.jpeg";
import seven from "./images/7.jpeg";
import dowry from "./images/dowryharrasement.jpeg";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [caseIDs,setCaseIDs]=useState([])
  const [completedCases,setCompletedCases]=useState([])

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
    async function fetchData() {
      const response = await fetch("http://localhost:8080/getCompletedCases", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCompletedCases(data.result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % components.length); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);
  const components = [
    { imgSrc: acidAttack, text: "This case is related to acid Attack" },
    { imgSrc: Rape, text: "This case is related to Rape case" },
    { imgSrc: seven, text: "This is statistics" },
    { imgSrc: dowry, text: "This image shows dowry cases" },
  ];
  return (
    <>
      <div className="container">
        <div className="content__container">
          <h1>
            <br />

            <br />
            <span className="heading__1">
              Blockchain and IPFS-Based Evidence Protection System
            </span>
            <br />
            <span className="heading__2">for Safeguarding Women's Rights</span>
          </h1>
          <div className="para">
            <p style={{ color: "white" }}>
              This portal is an initiative to facilitate victims/complainants to
              report cyber crime complaints online. This portal caters to
              complaints pertaining to cyber crimes only with special focus on
              cyber crimes against women. Complaints reported on this portal are
              dealt by law enforcement agencies/ police based on the information
              available in the complaints. It is imperative to provide correct
              and accurate details while filing complaint for prompt action.
            </p>
          </div>
        </div>
        <div className="image__container">
          <img
            src={image2}
            alt="header"
            style={{ border: "5px solid black" }}
          />
          <img
            src={image}
            alt="background"
            style={{ border: "5px solid black" }}
          />
          <img
            src={domesticViolence}
            alt="background"
            style={{ border: "5px solid black" }}
          />
        </div>
      </div>

      <div
        style={{
          color: "#0f1e6a",
          fontWeight: "bolder",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "100px",
          marginTop: "120px",
          fontSize: "2rem",
        }}
      >
        Relative Cases
      </div>

      <div
        className="center-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <div
          className="info"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          {components.map((component, index) => (
            <div
              key={index}
              className="first"
              style={{
                display: activeIndex === index ? "flex" : "none",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                width: "800px",
                border: "2px solid black",
                borderRadius: "50px",
              }}
            >
              <img
                src={component.imgSrc}
                alt=""
                style={{
                  height: "400px",
                  width: "400px",
                  border: "5px solid white",
                  marginLeft: "0px",
                }}
              />
              <div className="details" style={{ marginLeft: "20px" }}>
                {component.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container2">
        <div className="left">
          <div>Total Cases Register</div>
          <div>{caseIDs && (<>{caseIDs.length}</>)}</div>
        </div>

        <div className="left">
          <div>Total Cases Handled Successfully</div>
          <div>{completedCases && (<>{completedCases.length}</>)}</div>
        </div>
      </div>
    </>
  );
}
