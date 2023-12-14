import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Marquee from "react-fast-marquee";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "./about.css";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
const CheckAboutCompany = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [company, setCompany] = useState({});
  const findDetail = async () => {
    try {
      const token = params.companyId;

      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/company/getcompanydetail",
        {
          token,
        }
      );
      const companyData = response.data.data;
      setData(companyData);
      console.log(companyData);
      const data = await axios.post(
        "https://edulink-backend.onrender.com/api/company/findcompany",
        { token }
      );
      const companyNam = data.data.data;
      setCompany(companyNam);
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
          {companyId && (
            <p className=" display-1 font-weight-bold text-capitalize">
              {company.companyName}
            </p>
          )}
          {companyId && (
            <p
              className=" display-6 mb-5 text-capitalize"
              style={{ marginTop: "-23px" }}
            >
              {company.companyType} <hr />
            </p>
          )}
          <div class="col-3 ">
            <div class="row justify-content-end">
              <div class="col-xl-9 col-sm-12 col-12">
                {companyId && (
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
                          <span>Total Employees</span>
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

          <div className="horizontal-scroll-carousel align-items-end justify-content-end d-flex mt-5 ">
            <div className="carousel " style={{ width: "95%" }}>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Company Ethics
                </h5>
                <p className="card-text1 fs-6 text-dark">{data.ethics}</p>
              </div>

              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">Hiring Period</h5>
                <p className="card-text1 fs-6 text-dark">{data.hiringperiod}</p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">
                  Student Domain
                </h5>
                <p className="card-text1 fs-6 text-dark">
                  {data.studentdomain}
                </p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">Hiring Period</h5>
                <p className="card-text1 fs-6 text-dark">{data.hiringperiod}</p>
              </div>
              <div className="card1 border border-3 border-primary rounded-3 shadow">
                <h5 className="card-title1 fs-5 text-primary">Work Culture</h5>
                <p className="card-text1 fs-6 text-dark">{data.workculture}</p>
              </div>
            </div>
          </div>

          <div className=" align-items-center justify-content-center d-flex mt-4">
            <h1 className="display-5 text-center font-weight-bold mb-4">
              Industry Partnerships
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

          <div className="align-items-end justify-content-end d-flex">
            <section
              id="counter"
              className="section-padding"
              style={{ width: "94%", padding: "20px", borderRadius: "10px" }}
            >
              <div className="container text-center">
                <div className="d-flex flex-column align-items-center">
                  {data.industrypartnership.length === 0 ? (
                    <p style={{ color: "white", fontStyle: "italic" }}>
                      Not available yet
                    </p>
                  ) : (
                    <div>
                      <Marquee style={{ width: "100%" }}>
                        {data.industrypartnership.map((item, index) => (
                          <div className="card2" key={index}>
                            <h5
                              className="text-white"
                              style={{ fontStyle: "italic" }}
                            >
                              {item}
                            </h5>
                          </div>
                        ))}
                      </Marquee>
                      <Marquee
                        direction="right"
                        style={{ width: "100%", marginTop: "25px" }}
                      >
                        {data.industrypartnership.map((item, index) => (
                          <div className="card2" key={index}>
                            <h5
                              className="text-white"
                              style={{ fontStyle: "italic" }}
                            >
                              {item}
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

          <div className=" align-items-center justify-content-center d-flex mt-5">
            <h1 className="display-5 text-center font-weight-bold mb-4">
              Success Stories
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
          {data.successstories.length === 0 ? (
            <p
              style={{
                fontStyle: "italic",
                fontSize: "24px",
                color: "gray",
                margin: "20px",
              }}
            >
              Nothing to display yet
            </p>
          ) : (
            <div className="horizontal-scroll-carousel align-items-end justify-content-end d-flex">
              <Marquee
                className="rounded-2"
                pauseOnHover="true"
                style={{ width: "95%" }}
              >
                {data.successstories.map((item, index) => (
                  <div
                    className="card m-2 rounded-3"
                    key={index}
                    style={{
                      width: "18rem",
                      background: "rgba(225, 225, 225, 0.1)",
                    }}
                  >
                    <div className="card-body">
                      <p className="text-danger text-bold-500">
                        <i>"</i>
                        <em>{item}</em>
                        <i>"</i>
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckAboutCompany;
