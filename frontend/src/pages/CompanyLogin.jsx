import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Redirection from "../components/Redirection";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CompanyLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const companyToken = localStorage.getItem("companytoken");
    if (companyToken) {
      navigate("/companypage");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const companyloginHandler = async (e) => {
    e.preventDefault();
    try {
      const values = { email, password };
      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/company/login",
        values
      );
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("companytoken", response.data.data);
        if (response.data.user.firstLogin) navigate("/add/companydetails");
        else navigate("/companypage");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <m.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid"
                  alt="Phone image"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form
                  className="p-4 bg-white rounded shadow-sm"
                  style={{
                    color: "#333" /* Change font color */,
                    backgroundColor:
                      "#f9f9f9" /* Change form background color */,
                    border: "1px solid #ccc" /* Add a border */,
                  }}
                  onSubmit={companyloginHandler}
                >
                  <h2
                    className="mb-4"
                    style={{
                      fontSize: "2.5rem" /* Increase font size */,
                      fontWeight: "bold" /* Add font weight */,
                      color: "#007bff" /* Change heading color */,
                      borderBottom:
                        "2px solid #007bff" /* Add underline effect */,
                      paddingBottom:
                        "0.5rem" /* Add some spacing at the bottom */,
                    }}
                  >
                    Company Login
                  </h2>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div></div>
                    <Link to="/companyreset" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <Redirection type={"college"} />

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    style={{
                      backgroundColor:
                        "#007bff" /* Change button background color */,
                      borderColor: "#007bff" /* Change button border color */,
                    }}
                  >
                    Sign In
                  </button>
                  <p className="mt-4">
                    New User?{" "}
                    <Link to="/companyregister" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </m.div>
    </>
  );
};

export default CompanyLogin;
