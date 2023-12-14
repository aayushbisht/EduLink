import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";
import { io } from "socket.io-client";
import Chat from "./Chat";
import "./search.css";
import { FaSearch } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
const CompanyList = () => {
  const [companyDataList, setCompanyDataList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  const getCompanyData = async () => {
    try {
      const response = await axios.post("/api/college/getcompanydata");
      setCompanyDataList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyData();
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCardClick = (companyData) => {
    setSelectedCompany((prevSelected) =>
      prevSelected === companyData ? null : companyData
    );
  };
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filtering
  const filteredCompanyData = companyDataList.filter((companyData) =>
    companyData.companyName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container" style={{ width: "80%" }}>
      <div className="row">
        <div
          className="col-md-6"
          style={{ overflowY: "auto", maxHeight: "70vh" }}
        >
          <div class="d-flex justify-content-center px-5 mb-4 mt-3 ">
            <div class="search" style={{ marginRight: "100px" }}>
              <input
                type="text"
                class="search-input"
                value={searchInput}
                placeholder="Search..."
                onChange={handleSearchInputChange}
                name=""
              />
              <a href="#" class="search-icon">
                <FaSearch />
              </a>
            </div>
          </div>

          {filteredCompanyData.length > 0 ? (
            filteredCompanyData.map((companyData) => (
              <CompanyCard
                key={companyData._id}
                companyData={companyData}
                loggedInUserId={localStorage.getItem("collegetoken")}
                handleClick={() => handleCardClick(companyData)}
              />
            ))
          ) : (
            <div className="text-center" style={{ height: "100px" }}>
              <FaExclamationCircle size={30} color="#ff6347" />
              <p className="card-text fs-5 fw-bold mb-0 mt-2">
                No Company Found!
              </p>
            </div>
          )}
        </div>
        <div className="col-md-6">
          {selectedCompany ? (
            <div
              className="college-details card mb-3 border-0 shadow rounded"
              style={{
                background: "linear-gradient(to right, #b7d8e8, #c7e9f4)",
              }}
            >
              <div class="row">
                <div class="col-3 ">
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
                                  {selectedCompany.companyDetail.employees}
                                </h5>
                                <span>Total Employees</span>
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
                              <div class="media-body text-right">
                                <h6>
                                  {selectedCompany.companyDetail.location}
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
                        Tech Domains
                      </button>
                      <div class="collapse" id="collapsedomain">
                        <div class="card card-body">
                          {selectedCompany.companyDetail.domains}
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
                            {selectedCompany.companyName}
                          </h5>
                          <h6 className="card-subtitle text-capitalize fw-semibold text-muted">
                            {selectedCompany.companyType}
                          </h6>
                        </div>
                      </div>
                    </div>

                    <p>
                      {expanded
                        ? selectedCompany.companyDetail.about
                        : selectedCompany.companyDetail.about.slice(0, 250) +
                          "..."}{" "}
                      {selectedCompany.companyDetail.about.length > 200 && (
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
                        {selectedCompany.companyDetail.about}
                      </div>
                    )}
                    {selectedCompany && (
                      <Chat
                        userType="college"
                        loggedInUserId={localStorage.getItem("collegetoken")}
                        userId={selectedCompany._id}
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
                <i className="fas fa-building fs-3 mb-3 text-muted"></i>
                <p className="card-text fs-5 fw-bold mb-0">
                  Click on a Company to view details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
