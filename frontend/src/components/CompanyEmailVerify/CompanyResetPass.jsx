import React from "react";
import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import success from "../EmailVerify/success.png";
import axios from "axios";
import CompanyResetPassword from "../../pages/CompanyResetPassword";

const CompanyResetPass = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `https://edulink-backend.onrender.com/api/company/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        setValidUrl(true);

        const interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.log(error);
        setValidUrl(true);
      }
    };
    verifyEmail();
  }, [param, navigate]);

  useEffect(() => {
    if (countdown === 0) {
      setValidUrl(false);
    }
  }, [countdown]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Company Email verified successfully</h1>
          <p>Automatically Redirecting in {countdown}...</p>
        </div>
      ) : (
        <CompanyResetPassword />
      )}
    </Fragment>
  );
};

export default CompanyResetPass;
