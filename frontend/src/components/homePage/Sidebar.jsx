import FacultyService from "../../utils/FacultyService";
import { useEffect, useState } from "react";
import Faculty from "./Faculty";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const [faculties, setFaculties] = useState([]);

  const retrieve = async () => {
    const response = await FacultyService.getFaculties();
    setFaculties(response);
  };

  useEffect(() => {
    retrieve();
  }, []);

  return (
    <div className={styles.sidebar}>
      {faculties.map((faculty) => {
        return (
          <div key={faculty.id}>
            <Faculty faculty={faculty} />
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
