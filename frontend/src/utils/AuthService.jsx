/* eslint-disable import/no-anonymous-default-export */
import API from "../api";

const register = (name, email, password, facultyId, departmentId) =>
  API.post("register", {
    name,
    email,
    password,
    faculty_id: facultyId,
    department_id: departmentId,
  })
    .then((response) => response.data)
    .catch((error) => error.response);

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
  return JSON.parse(localStorage.getItem("user"));
};

const getUser = () => {
  return API.get(`user/account`).then((response) => {
    return response.data;
  });
};

const updateUser = (name, email, facultyId, department) => {
  return API.put(`user/account`, {
    name,
    email,
    faculty_id: facultyId,
    department_id: department,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response.data);
};

const changePassword = (oldPassword, newPassword) => {
  return API.put(`user/change`, {
    oldPassword,
    newPassword,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response.data);
};

export default {
  register,
  login,
  logout,
  getUser,
  getCurrentUser,
  updateUser,
  changePassword,
};
