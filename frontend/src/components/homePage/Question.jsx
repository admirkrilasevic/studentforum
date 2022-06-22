import { faMapPin, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parseJWT from "../../utils/parseJwt";
import QuestionService from "../../utils/QuestionService";
import styles from "./Question.module.css";

function Question({ question }) {
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

  useEffect(() => {
    const userData = parseJWT(localStorage.getItem("user"));
    setUser(userData);
    if (expanded) {
      retrieveAnswers(question.id);
    }
  }, [expanded]);

  const addAnswer = async () => {
    setShowForm(false);
    const data = {
      answerBody,
      question_id: question.id,
    };
    const response = await QuestionService.postAnswer(data);
    console.log(response);
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
  };

  return (
    <Container key={question.id} className={styles.questionContainer}>
      <ToastContainer />
      <Row
        className={
          expanded ? styles.questionHeaderExpanded : styles.questionHeader
        }
      >
        <Col className={styles.questionSubject}>
          <strong>{question.subject}</strong>
          <div className={styles.questionBody}>{question.body}</div>
        </Col>
        <Col className={styles.questionDetails}>
          Posted at &nbsp;
          {question.posted_at}
          <br />
          By &nbsp;
          {question.name}
          <br />
          <br />
          <span
            onClick={() => setExpanded(!expanded)}
            className={styles.viewThread}
          >
            {expanded ? "Hide Thread" : "View Thread"}
          </span>
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
                      {user.id === answer.user_id && (
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
                          answer.is_pinned && styles.pinActive
                        }`}
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
            {!showForm && (
              <div className={styles.addAnswer}>
                <button onClick={() => handleAddClick()}>Add answer</button>
              </div>
            )}
            {showForm && (
              <div className={styles.addAnswerPrompt}>
                <textarea
                  className={styles.answerInput}
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
                  <button className={styles.save} onClick={() => addAnswer()}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.noAnswers}>No answers yet</div>
        ))}
    </Container>
  );
}

export default Question;
