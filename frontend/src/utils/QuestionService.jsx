/* eslint-disable import/no-anonymous-default-export */
import { Api } from "../api";

const myApi = Api.getInstance();

const getQuestionsForCourse = (courseId) => {
  return myApi.get(`questions/${courseId}`).then((response) => {
    return response.data;
  });
};

const getAnswersForQuestion = (questionId) => {
  return myApi.get(`answers-by-question/${questionId}`).then((response) => {
    return response.data;
  });
};

const postQuestion = (question) =>
  myApi
    .post("user/questions", {
      subject: question.subject,
      body: question.body,
      department_id: question.department_id,
      course_id: question.course_id,
      semester_id: question.semester_id,
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const postAnswer = (data) =>
  myApi
    .post("user/answers", {
      body: data.answerBody,
      question_id: data.question_id,
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const pinAnswer = ({ answerId, questionId, value }) =>
  myApi
    .put(`user/answers/pin/${answerId}/${questionId}/${value}`)
    .then((response) => response.data)
    .catch((error) => error.response);

const updateAnswer = ({ answerId, status }) =>
  myApi
    .put(`user/answers/${answerId}`, {
      STATUS: status,
    })
    .then((response) => response.data)
    .catch((error) => error.response);

export default {
  getQuestionsForCourse,
  getAnswersForQuestion,
  postQuestion,
  postAnswer,
  pinAnswer,
  updateAnswer,
};
