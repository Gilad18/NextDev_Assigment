import axios from "axios";

const API = axios.create({
  baseURL: "https://nextdev-gilad.herokuapp.com/server/api",
});

export default API;
