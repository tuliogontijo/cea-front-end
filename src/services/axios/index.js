import axios from "axios";

const ceaAPI = axios.create({
  baseURL: process.env.REACT_APP_CEA_BASE,
});

export { ceaAPI };
