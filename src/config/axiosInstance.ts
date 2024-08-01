import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://www.themealdb.com/api/json/v1/1/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;