import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AuthService from "../../utils/AuthService";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../pages/Forms.module.css";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleChange = async () => {
    const response = await AuthService.changePassword(
      currentPassword,
      newPassword
    );
    if (response.token) {
      localStorage.setItem("user", JSON.stringify(response));
      toast("Password changed successfully", {
        type: "success",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(response.message, {
        type: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
      <div className={styles.formTitle}>Change Password</div>
      <div className={styles.formSection}>
        <p>Current password</p>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div className={styles.formSection}>
        <p>New password</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <button
        type="submit"
        className={styles.formSubmitButton}
        onClick={() => handleChange()}
      >
        Change password
      </button>
    </div>
  );
}

export default Settings;
