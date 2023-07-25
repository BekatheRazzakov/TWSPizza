import axios from "axios";

export const axiosApi = axios.create({
  baseURL: 'https://js-course-7dfaf-default-rtdb.europe-west1.firebasedatabase.app/pizza',
});