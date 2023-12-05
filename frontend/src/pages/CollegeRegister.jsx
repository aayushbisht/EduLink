import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Redirection from "../components/Redirection";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CollegeRegister = () => {
  const [collegeName, setCollegeName] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setAvatar(e.target.value);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const values = {
        collegeName,
        collegeType,
        contactPerson,
        email,
        password,
        phone,
        avatar,
      };
      const response = await axios.post(
        "https://edulink-backend.onrender.comhttps://edulink-backend.onrender.com/api/college/register",
        values
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setVerificationSent(true);
        // navigate("/collegelogin");
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
        className="bg-light"
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
                  alt="Phone"
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
                  onSubmit={registerHandler}
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
                    College Registration
                  </h2>

                  <div className="form-group mb-4">
                    <input
                      type="text"
                      id="collegeName"
                      className="form-control form-control-lg"
                      placeholder="College Name"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="text"
                      id="collegeType"
                      className="form-control form-control-lg"
                      placeholder="College Type"
                      required
                      value={collegeType}
                      onChange={(e) => setCollegeType(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="text"
                      id="contactPerson"
                      className="form-control form-control-lg"
                      placeholder="Contact Person"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {verificationSent && (
                    <div className="alert alert-success mt-3" role="alert">
                      Verification email has been sent to your email address.
                      Please check your inbox.
                    </div>
                  )}

                  <div className="form-group mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Create Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="text"
                      id="phone"
                      className="form-control form-control-lg"
                      placeholder="Phone Number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <img src="./assets/images/bg1.png" alt="avatarPreview" />
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    style={{
                      backgroundColor:
                        "#007bff" /* Change button background color */,
                      borderColor: "#007bff" /* Change button border color */,
                    }}
                  >
                    Sign Up
                  </button>

                  <p className="mt-4">
                    Already have an account?{" "}
                    <Link to="/collegelogin" className="text-primary">
                      Sign In
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

export default CollegeRegister;
