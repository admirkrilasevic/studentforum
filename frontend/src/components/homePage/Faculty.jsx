import { faTrash, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/AuthService";
import FacultyService from "../../utils/FacultyService";
import parseJWT from "../../utils/parseJwt";
import Modal from "../Modal/Modal";
import styles from "./Sidebar.module.css";
import formStyles from "../../pages/Forms.module.css";

function Faculty({ faculty }) {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [facultyModal, setFacultyModal] = useState(false);

  const retrieve = async (id) => {
    const response = await FacultyService.getDepartmentsForFaculty(id);
    setDepartments(response);
  };

  const toggleDepartments = (id) => {
    if (departments.length === 0) {
      retrieve(id);
    } else {
      setDepartments([]);
    }
  };

  const handleRemoveFaculty = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this faculty?"
    );
    if (confirm) {
      FacultyService.removeFaculty(id);
      window.location.reload();
    }
  };

  const handleRemoveDepartment = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirm) {
      FacultyService.removeDepartment(id);
      setDepartments(departments.filter((department) => department.id !== id));
    }
  };

  const handleAddDepartment = async () => {
    setFacultyModal(false);
    setName("");
    const response = await FacultyService.addDepartment(name, faculty.id);
    setDepartments([...departments, response]);
  };

  const isAdmin = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const parsedUser = parseJWT(user.token);
      return parsedUser.r === "ADMIN";
    }
    return false;
  };

  return (
    <div>
      <div
        className={styles.faculty}
        onClick={() => toggleDepartments(faculty.id)}
      >
        {faculty.name}
        {isAdmin() && (
          <>
            <FontAwesomeIcon
              className={styles.trashIcon}
              onClick={() => {
                handleRemoveFaculty(faculty.id);
              }}
              icon={faTrash}
            />
            <FontAwesomeIcon
              className={styles.addIcon}
              onClick={(e) => {
                e.stopPropagation();
                setFacultyModal(true);
              }}
              icon={faCirclePlus}
            />
          </>
        )}
      </div>
      {departments && departments.length > 0 && (
        <div className={styles.departments}>
          {departments.map((department) => {
            return (
              <span className={styles.department}>
                <Link key={department.id} to={`/home/${department.id}`}>
                  {department.name}
                </Link>
                {isAdmin() && (
                  <FontAwesomeIcon
                    className={styles.trashIcon}
                    onClick={() => {
                      handleRemoveDepartment(department.id);
                    }}
                    icon={faTrash}
                  />
                )}
              </span>
            );
          })}
        </div>
      )}
      <Modal close={() => setFacultyModal(false)} isOpen={facultyModal}>
        <div className={formStyles.formTitle}>Add Department</div>
        <div className={formStyles.departmentFormSection}>
          <p>Department</p>
          <input
            type="text"
            value={name}
            placeholder="Enter a department"
            onChange={(e) => setName(e.target.value)}
            className={styles.departmentInput}
          />
        </div>
        <button
          type="submit"
          className={formStyles.formSubmitButton}
          onClick={() => handleAddDepartment()}
        >
          Add
        </button>
      </Modal>
    </div>
  );
}

export default Faculty;
