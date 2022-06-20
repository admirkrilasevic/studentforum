import API from "../api";

const getFaculties = () => {
  return API.get("faculties").then((response) => {
    return response.data;
  });
};

const getDepartmentsForFaculty = (facultyId) => {
  return API.get(`departments/${facultyId}`).then((response) => {
    return response.data;
  });
};

const getDepartmentById = (departmentId) => {
  return API.get(`/department/${departmentId}`).then((response) => {
    return response.data;
  });
};

export default {
  getFaculties,
  getDepartmentsForFaculty,
  getDepartmentById,
};
