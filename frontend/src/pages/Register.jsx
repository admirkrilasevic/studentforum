import React, { useState } from "react";
import { useEffect } from "react";
import SelectInput from "../components/SelectInput/SelectInput";
import AuthService from "../utils/AuthService";
import FacultyService from "../utils/FacultyService";
import styles from "./Forms.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState();
  const [department, setDepartment] = useState();
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  const handleRegister = async () => {
    if (!name || !email || !password || !faculty || !department) {
      setErrorMessage("Please provide all the required fields.");
    } else {
      const response = await AuthService.register(
        name,
        email,
        password,
        faculty.id,
        department.id
      );
      if (response.status && response.status !== 200) {
        setMessage(undefined);
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage(undefined);
        setMessage(response.message);
      }
    }
  };

  const getFaculties = async () => {
    const response = await FacultyService.getFaculties();
    setFaculties(response);
  };

  const getDepartments = async () => {
    const response = await FacultyService.getDepartmentsForFaculty(faculty.id);
    setDepartments(response);
  };

  useEffect(() => {
    getFaculties();
  }, []);

  useEffect(() => {
    getDepartments();
  }, [faculty]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitle}>Register</div>
      <div className={styles.formSection}>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.formInput}
        />
      </div>
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
      <div className={styles.formSection}>
        <p>Faculty</p>
        <SelectInput
          value={faculty}
          items={faculties}
          selectItem={setFaculty}
          hint="Choose a faculty"
        />
      </div>
      {faculty && (
        <div className={styles.formSection}>
          <p>Department</p>
          <SelectInput
            value={department}
            items={departments}
            selectItem={setDepartment}
            hint="Choose a department"
          />
        </div>
      )}
      <button
        type="submit"
        className={styles.formSubmitButton}
        onClick={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        onKeyDown={() => handleRegister()}
      >
        Register
      </button>
      {message && <div className={styles.successMessage}>{message}</div>}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default Register;
