import axios from "axios";

const Api = axios.create({
  baseURL: "https://iroriginaltest.com/api",
});

export default Api;
