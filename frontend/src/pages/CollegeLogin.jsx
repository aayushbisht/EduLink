import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Redirection from "../components/Redirection";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CollegeLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const collegeToken = localStorage.getItem("collegetoken");
    if (collegeToken) {
      navigate("/collegepage");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const values = { email, password };
      const response = await axios.post("/api/college/login", values);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("collegetoken", response.data.data);
        navigate("/collegepage");
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
                  onSubmit={loginHandler}
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
                    College Login
                  </h2>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      required
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
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div></div>
                    <Link to="/collegereset" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <Redirection type={"company"} />

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
                    <Link to="/collegeregister" className="text-primary">
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

export default CollegeLogin;
