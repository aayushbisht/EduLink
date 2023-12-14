import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "./about.css";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";

const CheckAboutCollege = () => {
  const params = useParams();
  // console.log(params);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //   const { companyId } = useParams();
  const [college, setCollege] = useState({});
  const navigate = useNavigate();

  const { collegeId } = useParams();
  const findDetail = async () => {
    try {
      // const token = localStorage.getItem("companytoken");
      const token = params.collegeId;

      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/college/getcollegedetail",
        {
          token,
        }
      );
      const collegeData = response.data.data;
      setData(collegeData);
      console.log(collegeData);
      const data = await axios.post(
        "https://edulink-backend.onrender.com/api/college/findcollege",
        { token }
      );
      const collegeNam = data.data.data;
      setCollege(collegeNam);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findDetail();
  }, []);
  return (
    <div
      className="my-5 container-md text-center"
      style={{ width: "70%", marginTop: "30px" }}
    >
      {isLoading ? (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div class="row">
          {collegeId && (
            <p className=" display-1 font-weight-bold">{college.collegeName}</p>
          )}
          {collegeId && (
            <p className=" display-6 mb-5" style={{ marginTop: "-23px" }}>
              {college.collegeType}
            </p>
          )}

          <div class="col-3 ">
            <div class="row justify-content-end">
              <div class="col-xl-9 col-sm-12 col-12">
                {collegeId && (
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-primary mb-3 rounded-2"
                    style={{ position: "absolute", top: 10, left: 10 }}
                  >
                    Back
                  </button>
                )}

                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-user warning font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right float-end">
                          <h3>{data.employees}</h3>
                          <span>Total Students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-user warning font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right float-end">
                          <h3>
                            {data.naacranking ===
                            "Details will be available soon"
                              ? "N/A"
                              : data.naacranking}
                          </h3>
                          <span>NIRF Ranking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-end ">
              <div class="col-xl-9 col-sm-12 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-pointer danger font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right">
                          <h6>{data.location}</h6>
                          <span>Location</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-xl-9 col-sm-12 col-12">
                <button
                  class="btn btn-success"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Tech Domains
                </button>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    {data.domains.map((domain, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 p-2 rounded-md text-capitalize font-monospace "
                      >
                        {domain}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class=" col-9" style={{ height: "400px" }}>
            <Swiper
              direction={"vertical"}
              slidesPerView={"auto"}
              freeMode={true}
              scrollbar={true}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel]}
              className="mySwiper rounded-5 border-start bg-primary bg-opacity-10 bg-gradient fs-5 py-1 px-5 text-primary-emphasis"
            >
              <SwiperSlide>{data.about}</SwiperSlide>
            </Swiper>
          </div>

          <div className="horizontal-scroll-carousel align-items-end justify-content-end d-flex ">
            <div className="carousel " style={{ width: "95%" }}>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Highest Package
                </h5>
                <p className="card-text1 fs-6 text-dark">{data.maxpackage}</p>
              </div>

              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Average Package
                </h5>
                <p className="card-text1 fs-6 text-dark">
                  {data.averagepackage}
                </p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Foreign Tieups
                </h5>
                <p className="card-text1 fs-6 text-dark">
                  {data.foreigntieups}
                </p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Alumni Networks
                </h5>
                <p className="card-text1 fs-6 text-dark">
                  {data.alumninetwork}
                </p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Research Papers Published
                </h5>
                <p className="card-text1 fs-6 text-dark">
                  {data.researchpapers}
                </p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Interships Offered
                </h5>
                <p className="card-text1 fs-6 text-dark">
                  {data.internshipoffered}
                </p>
              </div>
            </div>
          </div>
          <div className=" align-items-center justify-content-center d-flex mt-4">
            <h1 className="display-5 text-center font-weight-bold mb-4">
              Companies Visited
              <hr
                style={{
                  border: "0",
                  height: "2px",
                  background:
                    "linear-gradient(to right, #007BFF, #6C757D, #007BFF)",
                  width: "25%",
                  margin: "15px auto",
                }}
              />
            </h1>
          </div>
          <div className=" align-items-end justify-content-end d-flex">
            <section
              id="counter"
              className="section-padding"
              style={{ width: "94%", padding: "20px", borderRadius: "10px" }}
            >
              <div className="container text-center">
                <div className="d-flex flex-column align-items-center">
                  {data.companiesvisited.length === 0 ? (
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "18px",
                        color: "white",
                      }}
                    >
                      No data available yet
                    </p>
                  ) : (
                    <div>
                      <Marquee style={{ width: "100%" }}>
                        {data.companiesvisited.map((company, index) => (
                          <div className="card2" key={index}>
                            <h5
                              className="text-white"
                              style={{ fontStyle: "italic" }}
                            >
                              {company}
                            </h5>
                          </div>
                        ))}
                      </Marquee>
                      <Marquee
                        direction="right"
                        style={{ width: "100%", marginTop: "25px" }}
                      >
                        {data.companiesvisited.map((company, index) => (
                          <div className="card2" key={index}>
                            <h5
                              className="text-white"
                              style={{ fontStyle: "italic" }}
                            >
                              {company}
                            </h5>
                          </div>
                        ))}
                      </Marquee>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckAboutCollege;
