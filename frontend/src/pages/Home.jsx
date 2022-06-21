import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../components/homePage/Sidebar";
import FacultyService from "../utils/FacultyService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";

function Home() {
  const { department } = useParams();

  const [retrievedDepartment, setRetrievedDepartment] = useState(null);
  const [coursesList, setCoursesList] = useState();
  const [course, setCourse] = useState();

  const retrieve = async (id) => {
    const response = await FacultyService.getDepartmentById(id);
    setRetrievedDepartment(response);
  };

  const getDepartmentCourses = async (id) => {
    const response = await FacultyService.getDepartmentCourses(id);
    setCoursesList(response);
  };

  useEffect(() => {
    if (department) {
      retrieve(department);
      getDepartmentCourses(department);
    }
  }, [department]);

  return (
    <Container className={styles.homeContainer}>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col xs={8}>
          {department === "0" ? (
            <div className={styles.welcomeMessage}>
              Welcome to askIBU! <br />
              Choose a deparment from the side menu to view courses and
              discussions.
            </div>
          ) : (
            <div className={styles.department}>
              <div className={styles.departmentHeader}>
                <div
                  className={styles.departmentName}
                  onClick={() => setCourse(undefined)}
                >
                  {retrievedDepartment && retrievedDepartment.name}
                </div>
                {course && (
                  <>
                    <FontAwesomeIcon
                      className={styles.chevronRight}
                      icon={faArrowRight}
                    />
                    <div className={styles.courseName}>{course.name}</div>
                  </>
                )}
              </div>
              <div className={styles.departmentContent}>
                {!course ? (
                  <>
                    <div className={styles.headerText}>
                      Please choose a course
                    </div>
                    {coursesList.map((course) => {
                      return (
                        <div
                          key={course.id}
                          onClick={() => setCourse(course)}
                          className={styles.courseContainer}
                        >
                          {course.name}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
