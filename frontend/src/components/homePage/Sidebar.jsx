import FacultyService from "../../utils/FacultyService";
import { useEffect, useState } from "react";
import Faculty from "./Faculty";
import styles from "./Sidebar.module.css";
import parseJWT from "../../utils/parseJwt";
import AuthService from "../../utils/AuthService";

function Sidebar() {
  const [faculties, setFaculties] = useState([]);
  const [name, setName] = useState("");

  const retrieve = async () => {
    const response = await FacultyService.getFaculties();
    setFaculties(response);
  };

  const isAdmin = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const parsedUser = parseJWT(user.token);
      return parsedUser.r === "ADMIN";
    }
    return false;
  };

  const handleAddFaculty = async () => {
    const response = await FacultyService.addFaculty(name);
    setFaculties([...faculties, response]);
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
      {isAdmin() && (
        <div className={styles.addFaculty}>
          <input
            type="text"
            placeholder="Faculty name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button onClick={() => handleAddFaculty()}>Add Faculty</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
