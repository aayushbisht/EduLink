import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import success from "./success.png";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://edulink-backend.onrender.com/api/college/${param.id}/verify/${param.token}`;
        await axios.get(url);
        setValidUrl(true);

        const interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error(error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [param, navigate]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/collegelogin");
    }
  }, [countdown]);

  return (
    <div className={styles.container}>
      {validUrl ? (
        <>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>College Email verified successfully</h1>
          <p>Automatically redirecting in {countdown}...</p>
          <Link to="/collegelogin">
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

export default EmailVerify;
