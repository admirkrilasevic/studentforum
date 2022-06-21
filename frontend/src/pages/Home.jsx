import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/homePage/Sidebar";
import FacultyService from "../utils/FacultyService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";
import QuestionService from "../utils/QuestionService";
import Question from "../components/homePage/Question";

function Home() {
  const { department } = useParams();
  const { courseId } = useParams();

  const [retrievedDepartment, setRetrievedDepartment] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");

  const retrieve = async (id) => {
    const departmentResponse = await FacultyService.getDepartmentById(id);
    setRetrievedDepartment(departmentResponse);
    const coursesResponse = await FacultyService.getDepartmentCourses(id);
    setCoursesList(coursesResponse);
  };

  const retrieveQuestions = async (id) => {
    const questionsResponse = await QuestionService.getQuestionsForCourse(id);
    setQuestionsList(questionsResponse);
  };

  useEffect(() => {
    if (department) {
      retrieve(department);
    }
  }, [department]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    const temp = coursesList.find((course) => {
      // eslint-disable-next-line eqeqeq
      if (course.id == courseId) {
        return course;
      }
    });
    setSelectedCourse(temp);
    retrieveQuestions(courseId);
  }, [coursesList, courseId]);

  const addQuestion = async () => {
    const question = {
      body,
      subject,
      course_id: selectedCourse.id,
      department_id: retrievedDepartment.id,
      semester_id: selectedCourse.semester_id,
    };
    const response = await QuestionService.postQuestion(question);
    console.log(response);
  };

  const showAddQuestionForm = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  return (
    <Container className={styles.homeContainer}>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col xs={8}>
          {!department ? (
            <div className={styles.welcomeMessage}>
              Welcome to askIBU! <br />
              Choose a deparment from the side menu to view courses and
              discussions.
            </div>
          ) : (
            <div className={styles.department}>
              <div className={styles.departmentHeader}>
                <div className={styles.departmentName}>
                  {retrievedDepartment && (
                    <Link to={`/home/${retrievedDepartment.id}`}>
                      {retrievedDepartment.name}
                    </Link>
                  )}
                </div>
                {courseId && (
                  <>
                    <FontAwesomeIcon
                      className={styles.chevronRight}
                      icon={faArrowRight}
                    />
                    <div className={styles.courseName}>
                      {selectedCourse && selectedCourse.name}
                    </div>
                  </>
                )}
                <div className={styles.addQuestion}>
                  {courseId && (
                    <button onClick={(e) => showAddQuestionForm(e)}>
                      Add question
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.departmentContent}>
                {showForm && (
                  <div className={styles.addQuestionForm}>
                    <h3>Add a Question</h3>
                    <form>
                      <div className={styles.questionSubject}>
                        <label>Subject</label>
                        <input
                          type="text"
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                      <div className={styles.questionBody}>
                        <label>Body</label>
                        <textarea
                          rows="4"
                          cols="50"
                          onChange={(e) => setBody(e.target.value)}
                        />
                      </div>
                      <div className={styles.questionSubmit}>
                        <button type="submit" onClick={() => addQuestion()}>
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {!courseId ? (
                  coursesList && coursesList.length > 0 ? (
                    <>
                      <div className={styles.headerText}>
                        Please choose a course
                      </div>
                      {coursesList.map((course) => {
                        return (
                          <div
                            key={course.id}
                            className={styles.courseContainer}
                          >
                            <Link
                              to={`/home/${department}/${course.id}`}
                              className={styles.courseLink}
                            >
                              {course.name}
                            </Link>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className={styles.headerText}>
                      No courses available
                    </div>
                  )
                ) : questionsList && questionsList.length > 0 ? (
                  <>
                    {questionsList.map((question) => {
                      return <Question question={question} />;
                    })}
                  </>
                ) : (
                  <div className={styles.headerText}>
                    No questions available
                  </div>
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
