import { faMapPin, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parseJWT from "../../utils/parseJwt";
import QuestionService from "../../utils/QuestionService";
import styles from "./Question.module.css";

function Question({ question, refreshQuestions }) {
  const { courseId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState();

  const [showForm, setShowForm] = useState(false);
  const [answerBody, setAnswerBody] = useState("");

  const retrieveAnswers = async (id) => {
    const answersResponse = await QuestionService.getAnswersForQuestion(id);
    answersResponse.sort((a, b) => {
      return b.is_pinned - a.is_pinned;
    });
    setAnswers(answersResponse);
  };

  const addAnswer = async () => {
    setShowForm(false);
    const data = {
      answerBody,
      question_id: question.id,
    };
    await QuestionService.postAnswer(data);
    retrieveAnswers(question.id);
  };

  const handleAddClick = () => {
    if (!localStorage.getItem("user")) {
      toast.error("You must be logged in to add an answer", {
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

  const handlePinAnswer = async (data) => {
    const response = await QuestionService.pinAnswer(data);
    if (response.status && response.status !== 200) {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      retrieveAnswers(question.id);
    }
  };

  const handleRemoveAnswer = async (data) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this answer?"
    );
    if (confirm) {
      const response = await QuestionService.updateAnswer(data);
      if (response.status && response.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.id) {
        retrieveAnswers(question.id);
      }
    }
  };

  const handleRemoveQuestion = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirm) {
      const response = await QuestionService.removeQuestion(id);
      if (response.status && response.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.id) {
        setExpanded(false);
        refreshQuestions(courseId);
      }
    }
  };

  const addAnswerSection = () => {
    return (
      <>
        {!showForm && (
          <div className={styles.addAnswer}>
            <button className="addAnswer" onClick={() => handleAddClick()}>
              Add answer
            </button>
          </div>
        )}
        {showForm && (
          <div className={styles.addAnswerPrompt}>
            <textarea
              className={`${styles.answerInput} answerBody`}
              onChange={(e) => setAnswerBody(e.target.value)}
              placeholder="Add your answer here"
            ></textarea>
            <div className={styles.answerButtons}>
              <button
                className={styles.cancel}
                onClick={() => setShowForm(!showForm)}
              >
                Cancel
              </button>
              <button
                className={`${styles.save} saveAnswer`}
                onClick={() => addAnswer()}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userData = parseJWT(localStorage.getItem("user"));
      setUser(userData);
    }
    if (expanded) {
      retrieveAnswers(question.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  return (
    <Container key={question.id} className={styles.questionContainer}>
      <ToastContainer />
      <Row
        className={
          expanded ? styles.questionHeaderExpanded : styles.questionHeader
        }
      >
        <Col className={styles.questionSubject}>
          <strong className="questionSubject">{question.subject}</strong>
          <div className={`${styles.questionBody} questionBody`}>
            {question.body}
          </div>
        </Col>
        <Col className={styles.questionDetails}>
          Posted at &nbsp;
          {question.posted_at}
          <br />
          By &nbsp;
          {question.name}
          <br />
          <br />
          <div className={styles.buttonContainer}>
            {user && user.id === question.user_id && (
              <span
                onClick={() => handleRemoveQuestion(question.id)}
                className={styles.deleteQuestion}
              >
                Delete
              </span>
            )}
            <span
              onClick={() => setExpanded(!expanded)}
              className={`${styles.viewAnswers} viewAnswers`}
            >
              {expanded ? "Hide Answers" : "View Answers"}
            </span>
          </div>
        </Col>
      </Row>
      {expanded &&
        (answers && answers.length > 0 ? (
          <div className={styles.answers}>
            {answers.map((answer) => {
              return (
                <div
                  key={answer.id}
                  className={`${
                    answer.is_pinned ? styles.answerPinned : styles.answer
                  } ${styles.answerContainer}`}
                >
                  <div>
                    <span className={styles.line}>
                      <>&ensp;&ensp;</>
                    </span>
                    &ensp;
                    {answer.body}
                  </div>
                  <div className={styles.additionalContent}>
                    <div className={styles.iconContainer}>
                      {user && user.id === answer.user_id && (
                        <FontAwesomeIcon
                          className={styles.trashIcon}
                          onClick={() => {
                            handleRemoveAnswer({
                              answerId: answer.id,
                              status: "REMOVED",
                            });
                          }}
                          icon={faTrash}
                        />
                      )}
                      <FontAwesomeIcon
                        className={`${styles.answerPin} ${
                          answer.is_pinned && `${styles.pinActive} pinnedAnswer`
                        } pinAnswer`}
                        onClick={() => {
                          handlePinAnswer({
                            answerId: answer.id,
                            questionId: question.id,
                            value: answer.is_pinned ? 0 : 1,
                          });
                        }}
                        icon={faMapPin}
                      />
                    </div>
                    <div className={styles.answerDetails}>
                      Posted at &nbsp;
                      {answer.posted_at}
                      <br />
                      By &nbsp;
                      {answer.name}
                    </div>
                  </div>
                </div>
              );
            })}
            {addAnswerSection()}
          </div>
        ) : (
          <div>
            <div className={styles.noAnswers}>No answers yet</div>
            {addAnswerSection()}
          </div>
        ))}
    </Container>
  );
}

export default Question;
