import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useState } from "react";
import axios from "axios";

const Stats = () => {
  const [rejectionData, setRejectionData] = useState(0);
  const [acceptedData, setAcceptedData] = useState(0);
  const [pendingData, setPendingData] = useState(0);
  const userId =
    localStorage.getItem("companytoken") ||
    localStorage.getItem("collegetoken");
  const chartContainer = useRef(null);

  useEffect(() => {
    const fetchrejectedData = async () => {
      try {
        const response = await axios.get(
          `https://edulink-backend.onrender.com/api/tieup/getRejectionCount/${userId}`
        );
        setRejectionData(response.data.finalRejectionCount);
        console.log(response.data.finalRejectionCount);
      } catch (error) {
        console.error("Error fetching rejection data:", error);
      }
    };
    const fetchacceptedData = async () => {
      try {
        const response = await axios.get(
          `https://edulink-backend.onrender.com/api/tieup/accepted/${userId}`
        );
        setAcceptedData(response.data.userAcceptedTieUpsSize);
      } catch (error) {
        console.error("Error fetching rejection data:", error);
      }
    };
    const fetchpendingData = async () => {
      try {
        const response = await axios.get(
          `https://edulink-backend.onrender.com/api/tieup/pending/${userId}`
        );
        setPendingData(response.data.userPendingTieUpsSize);
      } catch (error) {
        console.error("Error fetching rejection data:", error);
      }
    };
    fetchrejectedData();
    fetchacceptedData();
    fetchpendingData();
  }, []);

  useEffect(() => {
    if (chartContainer.current) {
      const chartData = {
        labels: ["Accepted", "Rejected", "Pending"],
        datasets: [
          {
            label: "Tie-up Requests",
            data: [acceptedData, rejectionData, pendingData],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 2,
          },
        ],
      };

      const chartConfig = {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Tie-up Requests",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      };

      const myChart = new Chart(chartContainer.current, chartConfig);

      return () => myChart.destroy();
    }
  }, [rejectionData, pendingData, acceptedData]);

  const chartStyle = {
    width: "60vw",
    height: "30vw",
    margin: "auto",
    display: "block",
    alignItem: "center",
    justifyContent: "center",
  };

  return (
    <div style={{ textAlign: "center" }}>
      {rejectionData === 0 && pendingData === 0 && acceptedData === 0 ? (
        <p>No data available for the pie chart</p>
      ) : (
        <canvas ref={chartContainer} style={chartStyle} />
      )}
    </div>
  );
};

export default Stats;
