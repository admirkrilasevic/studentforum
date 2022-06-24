import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/homePage/Sidebar";
import FacultyService from "../utils/FacultyService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import QuestionService from "../utils/QuestionService";
import Question from "../components/homePage/Question";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css";
import formStyles from "./Forms.module.css";
import AuthService from "../utils/AuthService";
import parseJWT from "../utils/parseJwt";
import Modal from "../components/Modal/Modal";

function Home() {
  const { department } = useParams();
  const { courseId } = useParams();
  let navigate = useNavigate();

  const [retrievedDepartment, setRetrievedDepartment] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);

  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");

  const [name, setName] = useState("");

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
    setShowQuestionForm(false);
    const question = {
      body,
      subject,
      course_id: selectedCourse.id,
      department_id: retrievedDepartment.id,
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
      setShowQuestionForm(!showQuestionForm);
    }
  };

  const handleAddCourse = async () => {
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
      setShowCourseForm(false);
      const response = await FacultyService.addCourse(name, department);
      setCoursesList([...coursesList, response]);
    }
  };

  const isAdmin = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const parsedUser = parseJWT(user.token);
      return parsedUser.r === "ADMIN";
    }
    return false;
  };

  const handleRemoveCourse = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirm) {
      await FacultyService.removeCourse(id);
      window.location.reload();
    }
  };

  return (
    <Container className={styles.homeContainer}>
      <Row className={styles.homeRow}>
        <Col xs sm={3} md={3} lg={3} className={styles.homeCol}>
          <Sidebar />
        </Col>
        <Col sm className={styles.homeCol}>
          {!department ? (
            <div className={styles.welcomeMessage}>
              Welcome to askIBU! <br />
              Choose a deparment from the menu to view courses and discussions.
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
                {!courseId && (
                  <div className={styles.addCourse}>
                    {isAdmin() && (
                      <button onClick={() => setShowCourseForm(true)}>
                        Add course
                      </button>
                    )}
                  </div>
                )}
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
                {courseId && (
                  <div className={styles.addQuestion}>
                    <button onClick={() => handleAddClick()}>
                      Add question
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.departmentContent}>
                <ToastContainer />
                {showQuestionForm && (
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
                      onClick={() => setShowQuestionForm(!showQuestionForm)}
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
                            {isAdmin() && (
                              <div className={styles.removeCourseContainer}>
                                <FontAwesomeIcon
                                  className={styles.trashIcon}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveCourse(course.id);
                                  }}
                                  icon={faTrash}
                                />
                              </div>
                            )}
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
      <Modal close={() => setShowCourseForm(false)} isOpen={showCourseForm}>
        <div className={formStyles.formTitle}>Add Course</div>
        <div className={styles.courseFormSection}>
          <p>Course</p>
          <input
            type="text"
            value={name}
            placeholder="Enter a course"
            onChange={(e) => setName(e.target.value)}
            className={styles.courseInput}
          />
        </div>
        <button
          type="submit"
          className={formStyles.formSubmitButton}
          onClick={() => handleAddCourse()}
        >
          Add
        </button>
      </Modal>
    </Container>
  );
}

export default Home;
