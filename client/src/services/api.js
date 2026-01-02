import axios from "axios";

const API = axios.create({
  baseURL: "https://clinic-website-project.onrender.com/api"
});

export default API;
