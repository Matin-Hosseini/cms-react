import axios from "axios";
const BASE_URL = "https://iroriginaltest.com/api";

const Api = axios.create({
  baseURL: BASE_URL,
});

export default Api;
