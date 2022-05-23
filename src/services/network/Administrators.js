import { ceaAPI } from "../axios";
import { ROUTES, ADMINISTRATOR } from "../endpoints";

const Administrator = {
  listPerPage: (query) => {
    return ceaAPI.get(ROUTES[ADMINISTRATOR].listPerPage(query));
  },
  create: (payload) => {
    return ceaAPI.post(ROUTES[ADMINISTRATOR].create(), payload);
  },
  update: (payload, id) => {
    return ceaAPI.put(ROUTES[ADMINISTRATOR].update(id), payload);
  },
  delete: (id) => {
    return ceaAPI.delete(ROUTES[ADMINISTRATOR].delete(id));
  },
  generatePassword: (payload) => {
    return ceaAPI.post(ROUTES[ADMINISTRATOR].generatePassword(), payload);
  },
  createPassword: (payload) => {
    return ceaAPI.post(ROUTES[ADMINISTRATOR].createPassword(), payload);
  },
};

export default Administrator;
