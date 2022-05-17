import axios from 'axios';
import { ENVIRONMENT } from './constants'

let API_URL = ''
if (process.env.REACT_APP_API_URL) {
    API_URL = `${process.env.REACT_APP_API_URL}/api/`
} else {
    API_URL = `${ENVIRONMENT.HOST}/api/`
}
const API = axios.create({
  baseURL: API_URL 
});

// Add a request interceptor
API.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })

export default API