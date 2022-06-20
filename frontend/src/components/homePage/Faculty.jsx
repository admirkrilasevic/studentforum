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

  return (
    <div>
      <div
        className={styles.faculty}
        onClick={() => toggleDepartments(faculty.id)}
      >
        {faculty.name}
      </div>
      {departments && departments.length > 0 && (
        <div className={styles.departments}>
          {departments.map((department) => {
            return (
              <Link to={`/home/${department.id}`} className={styles.department}>
                {department.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Faculty;
