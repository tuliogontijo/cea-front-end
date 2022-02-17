import axios from "axios";

const ceaAPI = axios.create({
  baseURL: process.env.REACT_APP_CEA_BASE,
});

// TODO: Implementar regras de token aqui quando houver autenticação

export { ceaAPI };
