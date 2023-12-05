import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ companyData, loggedInUserId, handleClick }) => {
  const navigate = useNavigate();
  // console.log(companyData);
  const [acceptedstatuscompany, setAcceptedcompany] = useState("");
  useEffect(() => {
    async function fetchTieUpStatus() {
      try {
        const response = await axios.get(
          `https://edulink-backend.onrender.com/api/tieup/statuscheck/${loggedInUserId}/${companyData._id}`
        );

        if (response.data.success === true) {
          const tieUpStatus = response.data.accepted;
          if (tieUpStatus === true) {
            setAcceptedcompany("Connected");
          } else if (tieUpStatus === false) {
            setAcceptedcompany("Request Pending...");
          }
        } else {
          setAcceptedcompany("Connect");
        }
      } catch (error) {
        console.error("Error fetching tie-up status:", error);
      }
    }

    fetchTieUpStatus();
  }, [loggedInUserId, companyData._id]);

  const aboutText =
    companyData.companyDetail?.about &&
    companyData.companyDetail.about.length > 100
      ? companyData.companyDetail.about.slice(0, 100) + "..."
      : companyData.companyDetail?.about || "About";

  const handleTieUpRequest = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/tieup/request",
        {
          senderId: loggedInUserId,
          receiverId: companyData._id,
          userType: "college",
        }
      );

      if (response.data.success) {
        setAcceptedcompany("Request Pending...");
        console.log("Tie-up request sent successfully");
      } else {
        console.error("Failed to send tie-up request");
      }
    } catch (error) {
      console.error("Error sending tie-up request:", error);
    }
  };

  return (
    <div
      className="college-card card mb-3 "
      onClick={handleClick}
      style={{ width: "80%", cursor: "pointer" }}
    >
      <div className="card-body">
        <h5 className="card-title">{companyData.companyName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {companyData.companyType}
        </h6>
        <p className="card-text">{aboutText}</p>
        <button
          onClick={handleTieUpRequest}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor:
              acceptedstatuscompany === "Request Pending..."
                ? "yellow"
                : acceptedstatuscompany === "Connected"
                ? "green"
                : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {acceptedstatuscompany}
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginLeft: "5px",
          }}
          onClick={() => navigate(`${companyData._id}/view/companyabout`)}
        >
          About <i class="bi bi-box-arrow-up-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
