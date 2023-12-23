import React from "react";
import CollegeCard from "./CollegeCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Chat from "./Chat";

function CollegeHistory({ loggedInUserId }) {
  const [collegeDataList, setCollegeDataList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };
  const getCollegeData = async () => {
    try {
      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/company/getcollegedata"
      );
      setCollegeDataList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCollegeData();
    const newSocket = io.connect("https://yoga-backend-4i5c.onrender.com");
    setSocket(newSocket);

    newSocket.emit("setUser", loggedInUserId);

    newSocket.on("initialChatHistory", (initialHistory) => {
      setChatHistory(initialHistory);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [loggedInUserId]);

  const filteredCollegeData = collegeDataList.filter((collegeData) => {
    return chatHistory.some(
      (chat) =>
        (chat.loggedInUserId === loggedInUserId &&
          chat.userId === collegeData._id) ||
        (chat.loggedInUserId === collegeData._id &&
          chat.userId === loggedInUserId)
    );
  });
  const handleCardClick = (collegeData) => {
    setSelectedCollege((prevSelected) =>
      prevSelected === collegeData ? null : collegeData
    );
  };

  return (
    <div className="container" style={{ width: "80%" }}>
      {filteredCollegeData.length === 0 ? (
        <div
          className="default-details card mb-3 border-0 shadow rounded"
          style={{ background: "#f0f0f0" }}
        >
          <div className="card-body text-center py-5">
            <p className="card-text fs-5 fw-bold mb-0">
              No Chat History Found.
            </p>
          </div>
        </div>
      ) : (
        <div className="row">
          <div
            className="col-md-6"
            style={{ overflowY: "auto", maxHeight: "70vh" }}
          >
            {filteredCollegeData.map((collegeData) => (
              <CollegeCard
                key={collegeData._id}
                collegeData={collegeData}
                loggedInUserId={loggedInUserId}
                handleClick={() => handleCardClick(collegeData)}
              />
            ))}
          </div>
          <div className="col-md-6">
            {selectedCollege ? (
              <div
                className="college-details card mb-3 border-0 shadow rounded"
                style={{
                  background: "linear-gradient(to right, #b7d8e8, #c7e9f4)",
                }}
              >
                <div class="row">
                  <div class="col-3">
                    <div class="row justify-content-end">
                      <div class="col-xl-11 col-sm-12 col-12">
                        <div class="card rounded-4 mt-4">
                          <div class="card-content">
                            <div class="card-body">
                              <div class="media d-flex">
                                <div class="align-self-center">
                                  <i class="icon-user warning font-medium-3 float-left"></i>
                                </div>
                                <div class="media-body text-right float-end">
                                  <h5>
                                    {selectedCollege.collegeDetail.employees}
                                  </h5>
                                  <span>Total Students</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-end ">
                      <div class="col-xl-11 col-sm-12 col-12">
                        <div class="card rounded-4">
                          <div class="card-content">
                            <div class="card-body">
                              <div class="media d-flex">
                                <div class="align-self-center">
                                  <i class="icon-pointer danger font-medium-3 float-left"></i>
                                </div>
                                <div class="media-body text-right text-capitalize">
                                  <h6>
                                    {selectedCollege.collegeDetail.location}
                                  </h6>
                                  <span>Location</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-end">
                      <div className="col-xl-11 col-sm-12 col-12">
                        <button
                          class="btn btn-success"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsedomain"
                          aria-expanded="false"
                          aria-controls="collapsedomain"
                        >
                          Courses Offered
                        </button>
                        <div class="collapse" id="collapsedomain">
                          <div class="card card-body">
                            {selectedCollege.collegeDetail.domains}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" col-9 mt-4">
                    <div
                      className=" rounded-5 border-start bg-primary bg-opacity-10 bg-gradient fs-7 py-4 px-3 text-primary-emphasis "
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      <div
                        className="card mb-4  rounded-5"
                        style={{ width: "50%", margin: "0 auto" }}
                      >
                        <div className="card-content rounded-5">
                          <div className="card-body text-black bg-primary bg-opacity-10 bg-gradient rounded-5">
                            <h5 className="card-title text-uppercase fw-bolder">
                              {selectedCollege.collegeName}
                            </h5>
                            <h6 className="card-subtitle text-capitalize fw-semibold text-muted">
                              {selectedCollege.collegeType}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <p>
                        {expanded
                          ? selectedCollege.collegeDetail.about
                          : selectedCollege.collegeDetail.about.slice(0, 250) +
                            "..."}{" "}
                        {selectedCollege.collegeDetail.about.length > 200 && (
                          <a type="button" onClick={toggleCollapse}>
                            {expanded ? (
                              <i class="bi bi-caret-up-fill"></i>
                            ) : (
                              <i class="bi bi-caret-down-fill"></i>
                            )}
                          </a>
                        )}
                      </p>
                      {expanded && (
                        <div className="collapse" id="collapseabout">
                          {selectedCollege.collegeDetail.about}
                        </div>
                      )}
                      {selectedCollege && (
                        <Chat
                          userType="company"
                          loggedInUserId={localStorage.getItem("companytoken")}
                          userId={selectedCollege._id}
                          socket={socket}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="default-details card mb-3 border-0 shadow rounded"
                style={{ background: "#f0f0f0" }}
              >
                <div className="card-body text-center py-5">
                  <i className="fas fa-graduation-cap fs-3 mb-3 text-muted"></i>
                  <p className="card-text fs-5 fw-bold mb-0">
                    Click on a College to view details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegeHistory;
