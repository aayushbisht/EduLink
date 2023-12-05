import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import {
  CollegeAbout,
  Tieups,
  CompanyHistory,
  CollegeList,
  Navbar,
  CompanyList,
  Stats,
} from "../components/index";
import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import CollegeDetail from "../components/CollegeDetail";

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [college, setCollege] = useState({});
  const [tieupsCount, setTieupsCount] = useState(0);

  const findUser = async () => {
    try {
      const token = localStorage.getItem("collegetoken");
      const data = await axios.post(
        "https://edulink-backend.onrender.com/api/college/findcollege",
        { token }
      );
      const collegeData = data.data.data;
      setCollege(collegeData);
      if (collegeData.firstLogin) {
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTieupsCountChange = () => {
    axios
      .get(
        `https://edulink-backend.onrender.com/api/tieup/pending/${localStorage.getItem(
          "collegetoken"
        )}`
      )
      .then((response) => setTieupsCount(response.data.pendingRequests.length))
      .catch((error) =>
        console.error("Error fetching pending requests count:", error)
      );
  };

  useEffect(() => {
    findUser();
    handleTieupsCountChange();
  }, []);

  const [selectedItem, setSelectedItem] = useState("about");

  const handleNavItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Toaster />
      <div className="container-fluid p-0 position-relative">
        {showModal ? (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ margin: "0 auto" }}>
                  <h5
                    className="modal-title"
                    id="exampleModalLongTitle"
                    style={{ margin: "0 auto" }}
                  >
                    Welcome to the EduLink
                  </h5>
                </div>
                <div className="modal-body">
                  <CollegeDetail setModal={setShowModal} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Navbar />
            <div style={{ height: "50vh" }}>
              <img
                src={
                  college.avatar && college.avatar.url
                    ? college.avatar.url
                    : "./assets/images/bg1.png"
                }
                alt="Your Image"
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Fixed profile box */}
            <div
              className="profile-box"
              style={{
                position: "absolute",
                transform: "translate(250%, -33%)",
                zIndex: "999",
              }}
            >
              <img
                src={
                  college.avatar && college.avatar.url
                    ? college.avatar.url
                    : "./assets/images/bg1.png"
                }
                alt="Profile Picture"
                className="img-fluid"
                style={{ width: "130px", height: "130px" }}
              />
              <h2>{college.collegeName}</h2>
              <p>{college.collegeType}</p>
            </div>

            {/* horizontal navigation bar */}
            <nav className="navbar navbar-expand-md navbar-light bg-light">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => handleNavItemClick("about")}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => handleNavItemClick("company")}
                  >
                    Browse Companies
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link
                    className="nav-link"
                    onClick={() => handleNavItemClick("tieups")}
                    style={{ marginRight: "8px" }}
                  >
                    Your Tie-Ups
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "1px 7px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                      }}
                    >
                      {tieupsCount}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => handleNavItemClick("history")}
                  >
                    History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => handleNavItemClick("statistics")}
                  >
                    Statistics
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Display corresponding component */}
            <div style={{ marginTop: "80px" }}>
              {selectedItem === "about" && <CollegeAbout />}
              {selectedItem === "tieups" && (
                <Tieups
                  loggedInUserId={localStorage.getItem("collegetoken")}
                  onTieupsCountChange={handleTieupsCountChange}
                />
              )}
              {selectedItem === "history" && (
                <CompanyHistory
                  loggedInUserId={localStorage.getItem("collegetoken")}
                  onTieupsCountChange={handleTieupsCountChange}
                />
              )}
              {selectedItem === "company" && <CompanyList />}
              {selectedItem === "statistics" && <Stats />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CompanyPage;
