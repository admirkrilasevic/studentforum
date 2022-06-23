/* eslint-disable import/no-anonymous-default-export */
import { Api } from "../api";

const myApi = Api.getInstance();

const getFaculties = () => {
  return myApi.get("faculties").then((response) => {
    return response.data;
  });
};

const getDepartmentsForFaculty = (facultyId) => {
  return myApi.get(`departments/${facultyId}`).then((response) => {
    return response.data;
  });
};

const getDepartmentById = (departmentId) => {
  return myApi.get(`/department/${departmentId}`).then((response) => {
    return response.data;
  });
};

const getDepartmentCourses = (departmentId) => {
  return myApi.get(`/courses/${departmentId}`).then((response) => {
    return response.data;
  });
};

const addFaculty = (name) =>
  myApi
    .post("admin/faculties", {
      name,
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const removeFaculty = (facultyId) =>
  myApi
    .put(`admin/faculties/${facultyId}`, {
      status: "REMOVED",
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const addDepartment = (name, facultyId) =>
  myApi
    .post("admin/departments", {
      name,
      faculty_id: facultyId,
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const removeDepartment = (departmentId) =>
  myApi
    .put(`admin/departments/remove/${departmentId}`, {
      status: "REMOVED",
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const addCourse = (name, courseId) =>
  myApi
    .post("admin/courses", {
      name,
      courseId: courseId,
    })
    .then((response) => response.data)
    .catch((error) => error.response);

const removeCourse = (courseId) =>
  myApi
    .put(`admin/courses/remove/${courseId}`, {
      status: "REMOVED",
    })
    .then((response) => response.data)
    .catch((error) => error.response);

export default {
  getFaculties,
  getDepartmentsForFaculty,
  getDepartmentById,
  getDepartmentCourses,
  addFaculty,
  removeFaculty,
  addDepartment,
  removeDepartment,
  addCourse,
  removeCourse,
};
