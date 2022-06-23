import axios from "axios";
import { ENVIRONMENT } from "./constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = `${process.env.REACT_APP_API_URL}/`;
} else {
  API_URL = `${ENVIRONMENT.HOST}/api/`;
}

export class Api {
  static instance;

  static getInstance() {
    if (!Api.instance) {
      console.log("Creating new instance of Api");
      Api.instance = axios.create({
        baseURL: API_URL,
      });
      // Add a request interceptor
      Api.instance.interceptors.request.use(
        (config) => {
          // Do something before request is sent
          const user = JSON.parse(localStorage.getItem("user"));
          user && (config.headers.Authorization = user.token);
          return config;
        },
        (error) =>
          // Do something with request error
          Promise.reject(error)
      );
    }
    return Api.instance;
  }
}
