import React, { useEffect, useState } from "react";
import AuthService from "../../utils/AuthService";
import FacultyService from "../../utils/FacultyService";
import styles from "../../pages/Forms.module.css";
import SelectInput from "../SelectInput/SelectInput";

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [faculty, setFaculty] = useState();
  const [department, setDepartment] = useState();
  const [faculties, setFaculties] = useState();
  const [departments, setDepartments] = useState();

  const getFaculties = async () => {
    const response = await FacultyService.getFaculties();
    setFaculties(response);
    return response;
  };

  const getDepartments = async (id) => {
    const response = await FacultyService.getDepartmentsForFaculty(id);
    setDepartments(response);
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
    const faculties = await getFaculties();
    const departments = await getDepartments(1);
    await retrieveUser(faculties, departments);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
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
          selectItem={(item) => {
            setFaculty(item);
            setDepartment(undefined);
            getDepartments(item.id);
          }}
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
  );
}

export default Profile;
