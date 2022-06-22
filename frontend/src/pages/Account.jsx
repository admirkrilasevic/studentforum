import React, { useEffect, useState } from "react";
import SelectInput from "../components/SelectInput/SelectInput";
import AuthService from "../utils/AuthService";
import FacultyService from "../utils/FacultyService";
import styles from "./Forms.module.css";

function Account() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [faculty, setFaculty] = useState();
  const [department, setDepartment] = useState();
  let faculties;
  let departments;

  const getFaculties = async () => {
    const response = await FacultyService.getFaculties();
    return response;
  };

  const getDepartments = async () => {
    const response = await FacultyService.getDepartments();
    return response;
  };

  const handleUpdateUser = async () => {
    /*     if (!name || !email || !faculty || !department) {
      setErrorMessage("Please provide all the required fields.");
      return;
    }
    const response = await AuthService.updateUser(
      user.id,
      name,
      email,
      faculty.id,
      department.id
    );
    if (response.status && response.status !== 200) {
      setMessage(undefined);
      setErrorMessage(response.data.message);
    } else {
      setErrorMessage(undefined);
      setMessage(response.message);
    } */
  };

  const retrieveUser = async (faculties, departments) => {
    const response = await AuthService.getUser();
    setEmail(response.email);
    setName(response.name);
    const userFaculty = faculties.find(
      (faculty) => faculty.id === response.faculty_id
    );
    setFaculty(userFaculty);
    const userDepartment = departments.find(
      (department) => department.id === response.department_id
    );
    setDepartment(userDepartment);
  };

  const getData = async () => {
    faculties = await getFaculties();
    departments = await getDepartments();
    await retrieveUser(faculties, departments);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>User Info</div>
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
          <p>Faculty</p>
          <SelectInput
            value={faculty}
            items={faculties}
            selectItem={setFaculty}
            hint="Loading..."
          />
        </div>
        <div className={styles.formSection}>
          <p>Department</p>
          <SelectInput
            value={department}
            items={departments}
            selectItem={setDepartment}
            hint="Choose a department"
          />
        </div>
        <button
          type="submit"
          className={styles.formSubmitButton}
          onClick={() => handleUpdateUser()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Account;
