import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'https://my-json-server.typicode.com/typicode/demo',
  timeout: 5000,
  // params: {
  //   "apikey": import.meta.env.API_KEY,
  // },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;