import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import success from "../EmailVerify/success.png";
import axios from "axios";

const CompanyEmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
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
    verifyEmailUrl();
  }, [param, navigate]);
  useEffect(() => {
    if (countdown === 0) {
      navigate("/companylogin");
    }
  }, [countdown, navigate]);

  return (
    <div className={styles.container}>
      {validUrl ? (
        <>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Company Email verified successfully</h1>
          <p>Automatically Redirecting in {countdown}...</p>
          <Link to="/companylogin">
            <button className={styles.green_btn} disabled={countdown > 0}>
              Login
            </button>
          </Link>
        </>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default CompanyEmailVerify;
