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
import Loader from "../Loader/Loader";

const CollegeEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://edulink-backend.onrender.com/api/college/verify-email",
        { email }
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error(`Error: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
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
                    color: "#333",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ccc",
                  }}
                  onSubmit={handleVerification}
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
                    Email Verification
                  </h2>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      placeholder="Enter Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block"
                      style={{
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                      }}
                    >
                      Send Verification Email
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </m.div>
    </div>
  );
};

export default CollegeEmail;
