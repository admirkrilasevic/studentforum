import React, { useState } from "react";
import SelectInput from "../components/SelectInput/SelectInput";
import AuthService from "../utils/AuthService";
import styles from "./Forms.module.css";

const MOCK_DATA = [
  {
    id: 1,
    name: "Vedran",
  },
  {
    id: 2,
    name: "Sara",
  },
  {
    id: 3,
    name: "Admir",
  },
  {
    id: 4,
    name: "Eldar",
  },
];

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState();
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    const response = await AuthService.register(
      name,
      email,
      password,
      faculty.id
    );
    setMessage(response.data.message);
  };

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
          items={MOCK_DATA}
          selectItem={setFaculty}
          hint="Choose a faculty"
        />
      </div>
      {faculty && (
        <div className={styles.formSection}>
          <p>Department</p>
          <SelectInput
            value={faculty}
            items={MOCK_DATA}
            selectItem={setFaculty}
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
      {message && <div className={styles.registerMessage}>{message}</div>}
    </div>
  );
}

export default Register;
