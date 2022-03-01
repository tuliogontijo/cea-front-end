import { ceaAPI } from "../axios";
import { ROUTES, FREEPOST } from "../endpoints";

const Freepost = {
  listPerPage: async (query) => {
    return await ceaAPI.get(ROUTES[FREEPOST].listPerPage(query));
  },
  create: async (payload) => {
    return await ceaAPI.post(ROUTES[FREEPOST].create(), payload);
  },
  update: async (payload, id) => {
    return await ceaAPI.put(ROUTES[FREEPOST].update(id), payload);
  },
  delete: async (id) => {
    return await ceaAPI.delete(ROUTES[FREEPOST].delete(id));
  }
};

export default Freepost;
