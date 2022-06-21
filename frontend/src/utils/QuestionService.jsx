/* eslint-disable import/no-anonymous-default-export */
import API from "../api";

const getQuestionsForCourse = (courseId) => {
  return API.get(`questions/${courseId}`).then((response) => {
    return response.data;
  });
};

const getAnswersForQuestion = (questionId) => {
  return API.get(`answers-by-question/${questionId}`).then((response) => {
    return response.data;
  });
};

const postQuestion = async (question) =>
  API.post("user/questions", {
    subject: question.subject,
    body: question.body,
    department_id: question.department_id,
    course_id: question.course_id,
    semester_id: question.semester_id,
  })
    .then((response) => response.data)
    .catch((error) => error.response);

export default {
  getQuestionsForCourse,
  getAnswersForQuestion,
  postQuestion,
};
