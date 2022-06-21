/* eslint-disable import/no-anonymous-default-export */
import API from "../api";

const getQuestionsForCourse = (courseId) => {
  return API.get(`questions/${courseId}`).then((response) => {
    return response.data;
  });
};

export default {
  getQuestionsForCourse,
};
