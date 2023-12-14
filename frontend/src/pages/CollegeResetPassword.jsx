import React from "react";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CollegeResetPassword = () => {
  const [newpassword, setnewPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `https://edulink-backend.onrender.com/api/college/reset-password/${param.id}`,
        {
          newpassword,
        }
      );
      toast.success(response.data.message);
      navigate("/collegelogin");
    } catch (error) {
      console.error("Error:", error);
      alert("Error resetting password. Please try again.");
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
                  onSubmit={handleSubmit}
                >
                  <h2
                    className="mb-4"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#007bff",
                      borderBottom: "2px solid #007bff",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    Reset Password
                  </h2>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      required
                      value={newpassword}
                      onChange={(e) => setnewPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      required
                      value={confirmpassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    style={{
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    }}
                  >
                    Confirm Password
                  </button>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    style={{
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                      marginLeft: "10px",
                    }}
                    onClick={() => navigate("/collegelogin")}
                  >
                    College Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </m.div>
    </div>
  );
};

export default CollegeResetPassword;
