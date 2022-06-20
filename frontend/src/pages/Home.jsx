import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/homePage/Sidebar";
import FacultyService from "../utils/FacultyService";
import styles from "./Home.module.css";

function Home() {
  const { department } = useParams();
  const { courseId } = useParams();

  const [retrievedDepartment, setRetrievedDepartment] = useState(null);
  const [retrievedCourses, setRetrievedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const retrieve = async (id) => {
    const departmentResponse = await FacultyService.getDepartmentById(id);
    setRetrievedDepartment(departmentResponse);
    const coursesResponse = await FacultyService.getCoursesForDepartment(id);
    setRetrievedCourses(coursesResponse);
  };

  useEffect(() => {
    if (department) {
      retrieve(department);
    }
  }, [department]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    const temp = retrievedCourses.find((course) => {
      // eslint-disable-next-line eqeqeq
      if (course.id == courseId) {
        return course;
      }
    });
    setSelectedCourse(temp);
  }, [retrievedCourses, courseId]);

  return (
    <Container className={styles.homeContainer}>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col>
          {!department ? (
            <div className={styles.welcomeMessage}>
              Welcome to askIBU! <br />
              Choose a deparment from the side menu to view courses and
              discussions.
            </div>
          ) : (
            <div className={styles.department}>
              <div className={styles.departmentName}>
                {retrievedDepartment && (
                  <Link to={`/home/${retrievedDepartment.id}`}>
                    {retrievedDepartment.name}
                  </Link>
                )}
                {selectedCourse && (
                  <span>
                    &ensp;
                    {"->"}
                    &ensp;
                    <span className={styles.selectedCourse}>
                      {selectedCourse.name}
                    </span>
                  </span>
                )}
              </div>
              {!courseId ? (
                <div>
                  <div className={styles.selectCourse}>
                    Select a course below
                  </div>
                  <div className={styles.courses}>
                    {retrievedCourses.map((course) => (
                      <div className={styles.course} key={course.id}>
                        <Link
                          to={`/home/${department}/${course.id}`}
                          className={styles.courseLink}
                        >
                          {course.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>Questions for course here</div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
