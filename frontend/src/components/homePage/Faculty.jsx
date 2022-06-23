import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/AuthService";
import FacultyService from "../../utils/FacultyService";
import parseJWT from "../../utils/parseJwt";
import styles from "./Sidebar.module.css";

function Faculty({ faculty }) {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

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
          <FontAwesomeIcon
            className={styles.trashIcon}
            onClick={() => {
              handleRemoveFaculty(faculty.id);
            }}
            icon={faTrash}
          />
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
          {isAdmin() && (
            <div className={styles.addDepartment}>
              <input
                type="text"
                placeholder="Department name"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <button onClick={() => handleAddDepartment()}>
                Add Department
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Faculty;
