import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CollegeCard = ({ collegeData, loggedInUserId, handleClick }) => {
  const [acceptedstatus, setAcceptedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTieUpStatus() {
      try {
        const response = await axios.get(
          `https://edulink-backend.onrender.com/api/tieup/statuscheck/${loggedInUserId}/${collegeData._id}`
        );

        if (response.data.success === true) {
          const tieUpStatus = response.data.accepted;
          if (tieUpStatus === true) {
            setAcceptedStatus("Connected");
          } else if (tieUpStatus === false) {
            setAcceptedStatus("Request Pending...");
          }
        } else {
          setAcceptedStatus("Connect");
        }
      } catch (error) {
        console.error("Error fetching tie-up status:", error);
      }
    }

    fetchTieUpStatus();
  }, [loggedInUserId, collegeData._id]);

  const aboutText =
    collegeData.collegeDetail?.about &&
    collegeData.collegeDetail.about.length > 100
      ? collegeData.collegeDetail.about.slice(0, 100) + "..."
      : collegeData.collegeDetail?.about || "About";

  const handleTieUpRequest = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/tieup/request",
        {
          senderId: loggedInUserId,
          receiverId: collegeData._id,
          userType: "company",
        }
      );

      if (response.data.success) {
        console.log("Tie-up request sent successfully");
        setAcceptedStatus("Request Pending...");
      } else {
        console.error("Failed to send tie-up request");
      }
    } catch (error) {
      console.error("Error sending tie-up request:", error);
    }
  };

  return (
    <div
      className="college-card card mb-3"
      onClick={handleClick}
      style={{ width: "80%", cursor: "pointer" }}
    >
      <div className="card-body">
        <h5 className="card-title">{collegeData.collegeName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {collegeData.collegeType}
        </h6>
        <p className="card-text">{aboutText}</p>
        <button
          onClick={handleTieUpRequest}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor:
              acceptedstatus === "Request Pending..."
                ? "yellow"
                : acceptedstatus === "Connected"
                ? "green"
                : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {acceptedstatus}
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
          onClick={() => navigate(`${collegeData._id}/view/collegeabout`)}
        >
          About <i class="bi bi-box-arrow-up-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;
