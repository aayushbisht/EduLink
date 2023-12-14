import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { About, Tieups, CollegeHistory, CollegeList, Navbar, Stats } from '../components/index';
import axios from 'axios';
import CompanyDetails from '../components/CompanyDetails';
import { Toaster } from 'react-hot-toast';
import NewLoader from '../Loader/NewLoader';

const CompanyPage = () => {
  const [selectedItem, setSelectedItem] = useState("about");
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true); 
  const [tieupsCount, setTieupsCount] = useState(0);

  const handleNavItemClick = (item) => {
    setSelectedItem(item);
  };

  const findUser = async () => {
    try {
      const token = localStorage.getItem("companytoken");
      const userData = await axios.post(
        "https://edulink-backend.onrender.com/api/company/findcompany",
        { token }
      );
      const companyData = userData.data.data;
      setCompany(companyData);
      setIsLoading(false);

      if (companyData.firstLogin) {
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
          "companytoken"
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

  return (
    <>
      <Toaster />
      <div className="container-fluid p-0 position-relative">
        {isLoading?<NewLoader/>:

        showModal ? (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Welcome to the EduLink
                  </h5>
                </div>
                <div className="modal-body">
                  <CompanyDetails setModal={setShowModal} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Navbar />

            {/* cover image */}
            <div style={{ height: "50vh" }}>
              <img
                src={
                  company.avatar && company.avatar.url
                    ? company.avatar.url
                    : "./assets/images/bg1.png"
                }
                alt="Your Image"
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="profile-box" style={{ position: "absolute", transform: "translate(250%, -33%)", zIndex: '999', }}>
              <img src={company.avatar && company.avatar.url ? company.avatar.url : "./assets/images/bg1.png"} style={{ width: "130px", height: "130px" }} />
              <h3>{company.companyName}</h3>
              <p>{company.companyType}</p>
            </div>
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
                    onClick={() => handleNavItemClick("college")}
                  >
                    Browse Colleges
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
              {selectedItem === "about" && <About />}
              {selectedItem === "tieups" && (
                <Tieups
                  loggedInUserId={localStorage.getItem("companytoken")}
                  onTieupsCountChange={handleTieupsCountChange}
                />
              )}
              {selectedItem === "history" && (
                <CollegeHistory
                  loggedInUserId={localStorage.getItem("companytoken")}
                />
              )}
              {selectedItem === "college" && <CollegeList />}
              {selectedItem === "statistics" && <Stats />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CompanyPage;
