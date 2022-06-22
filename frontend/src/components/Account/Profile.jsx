import React, { useEffect, useState } from "react";
import AuthService from "../../utils/AuthService";
import FacultyService from "../../utils/FacultyService";
import styles from "../../pages/Forms.module.css";
import SelectInput from "../SelectInput/SelectInput";
import parseJWT from "../../utils/parseJwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (!name || !email || !faculty || !department) {
      toast("Please fill in all fields", {
        type: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const response = await AuthService.updateUser(
      name,
      email,
      faculty.id,
      department.id
    );
    console.log(response);
    if (response.status && response.status !== "ACTIVE") {
      toast(response.data.message, {
        type: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast("Profile updated successfully", {
        type: "success",
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
    const deptId = parseJWT(localStorage.getItem("user")).d_id;
    const departments = await getDepartments(deptId);
    await retrieveUser(faculties, departments);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
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
