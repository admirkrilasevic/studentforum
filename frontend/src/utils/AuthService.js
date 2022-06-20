/* eslint-disable import/no-anonymous-default-export */
import API from "../api";

const register = (name, email, password, facultyId, departmentId) =>
  API.post("register", {
    name,
    email,
    password,
    faculty_id: facultyId,
    department_id: departmentId,
  });

const login = (email, password) =>
  API.post("login", {
    email,
    password,
  })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => error.response.data);

const logout = () => {
  localStorage.clear();
  window.location.replace("/home");
};

const getCurrentUser = () => {
  if (localStorage.getItem("updatedUser")) {
    return JSON.parse(localStorage.getItem("updatedUser"));
  }
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
