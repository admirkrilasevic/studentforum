import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/homePage/Sidebar";
import FacultyService from "../utils/FacultyService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import QuestionService from "../utils/QuestionService";
import Question from "../components/homePage/Question";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css";

function Home() {
  const { department } = useParams();
  const { courseId } = useParams();
  let navigate = useNavigate();

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
    setShowForm(false);
    const question = {
      body,
      subject,
      course_id: selectedCourse.id,
      department_id: retrievedDepartment.id,
      semester_id: selectedCourse.semester_id,
    };
    const response = await QuestionService.postQuestion(question);
    console.log(response);
    retrieveQuestions(courseId);
  };

  const handleAddClick = () => {
    if (!localStorage.getItem("user")) {
      toast.error("You must be logged in to add a question", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setShowForm(!showForm);
    }
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
                    <button onClick={() => handleAddClick()}>
                      Add question
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.departmentContent}>
                <ToastContainer />
                {showForm && (
                  <div className={styles.formContainer}>
                    <h3 className={styles.formTitle}>Add a Question</h3>
                    <div className={styles.formSection}>
                      <span>Subject</span>
                      <input
                        type="text"
                        className={styles.formInput}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className={styles.formSection}>
                      <span>Body</span>
                      <input
                        type="text"
                        className={styles.formInput}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </div>
                    <button
                      className={styles.formSubmitButton}
                      onClick={() => addQuestion()}
                    >
                      Add
                    </button>
                    <span
                      className={styles.hide}
                      onClick={() => setShowForm(!showForm)}
                    >
                      Hide
                    </span>
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
                            onClick={() => {
                              navigate(`/home/${department}/${course.id}`);
                            }}
                          >
                            <div className={styles.courseLink}>
                              {course.name}
                            </div>
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
