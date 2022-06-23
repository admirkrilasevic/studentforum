import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import FacultyService from "../../utils/FacultyService";
import styles from "./Sidebar.module.css";

function Faculty({ faculty }) {
  const [departments, setDepartments] = useState([]);

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

  return (
    <div>
      <div
        className={styles.faculty}
        onClick={() => toggleDepartments(faculty.id)}
      >
        {faculty.name}
        <FontAwesomeIcon
          className={styles.trashIcon}
          onClick={() => {
            handleRemoveFaculty(faculty.id);
          }}
          icon={faTrash}
        />
      </div>
      {departments && departments.length > 0 && (
        <div className={styles.departments}>
          {departments.map((department) => {
            return (
              <Link
                key={department.id}
                to={`/home/${department.id}`}
                className={styles.department}
              >
                {department.name}
                <FontAwesomeIcon
                  className={styles.trashIcon}
                  onClick={() => {
                    handleRemoveDepartment(department.id);
                  }}
                  icon={faTrash}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Faculty;
