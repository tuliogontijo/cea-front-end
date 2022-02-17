import { ceaAPI } from "../axios";
import { ROUTES, ADMINISTRATOR } from "../endpoints";

const Administrator = {
  listPerPage: async (query) => {
    return await ceaAPI.get(ROUTES[ADMINISTRATOR].listPerPage(query));
  },
  create: async (payload) => {
    return await ceaAPI.post(ROUTES[ADMINISTRATOR].create(), payload);
  },
  update: async (payload, id) => {
    return await ceaAPI.put(ROUTES[ADMINISTRATOR].update(id), payload);
  },
  delete: async (id) => {
    return await ceaAPI.delete(ROUTES[ADMINISTRATOR].delete(id));
  }
};

export default Administrator;
