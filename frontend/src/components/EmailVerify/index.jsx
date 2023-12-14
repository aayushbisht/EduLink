import { useEffect, useState, Fragment } from "react";
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
        const url = `/api/college/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [param, navigate]);

  return (
    <Fragment>
      <div className={styles.container}>
        <img src={success} alt="success_img" className={styles.success_img} />
        <h1>College Email verified successfully</h1>
        <Link to="/collegelogin">
          <button className={styles.green_btn}>Login</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default EmailVerify;
