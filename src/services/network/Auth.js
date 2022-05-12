import { ceaAPI } from "../axios";
import { AUTH, ROUTES } from "../endpoints";

const Auth = {
  login: async (payload) => ceaAPI.post(ROUTES[AUTH].login(), payload),
};

export default Auth;