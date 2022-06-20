import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/AuthService";
import styles from "./Forms.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const response = await AuthService.login(email, password);
    if (response.message) {
      setMessage(response.message);
    } else {
      window.location.replace("/home/0");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitle}>Login</div>
      <div className={styles.formSection}>
        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div className={styles.formSection}>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <button
        type="submit"
        className={styles.formSubmitButton}
        onClick={() => handleLogin()}
      >
        Login
      </button>
      <div className={styles.signInLinkContainer}>
        <div>Don&apos;t have an account?</div>
        <Link to="/register" className={styles.linkButton}>
          Sign in
        </Link>
      </div>
      {message && <div className={styles.registerMessage}>{message}</div>}
    </div>
  );
}

export default Login;
