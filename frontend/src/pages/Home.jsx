import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../components/homePage/Sidebar";
import FacultyService from "../utils/FacultyService";
import styles from "./Home.module.css";

function Home() {
  const { department } = useParams();

  const [retrievedDepartment, setRetrievedDepartment] = useState(null);

  const retrieve = async (id) => {
    const response = await FacultyService.getDepartmentById(id);
    setRetrievedDepartment(response);
  };

  useEffect(() => {
    if (department) {
      retrieve(department);
    }
  }, [department]);

  return (
    <Container className={styles.homeContainer}>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col>
          {department === "0" ? (
            <div className={styles.welcomeMessage}>
              Welcome to askIBU! <br />
              Choose a deparment from the side menu to view courses and
              discussions.
            </div>
          ) : (
            <div className={styles.department}>
              <div className={styles.departmentName}>
                {retrievedDepartment && retrievedDepartment.name}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
