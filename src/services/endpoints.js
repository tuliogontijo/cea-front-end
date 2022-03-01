import { formatQuery } from "../utils/formatQuery";

const ADMINISTRATOR = "Administrator";
const FREEPOST = "Freepost";

const ROUTES = [];

ROUTES[ADMINISTRATOR] = {
  listPerPage: (queries) => `/administrators/?${formatQuery(queries)}`,
  create: () => "/administrators/",
  update: (id) => `/administrators/${id}`,
  delete: (id) => `/administrators/${id}`
};

ROUTES[FREEPOST] = {
  listPerPage: (queries) => `/freeposts/?${formatQuery(queries)}`,
  create: () => "/freeposts/",
  update: (id) => `/freeposts/${id}`,
  delete: (id) => `/freeposts/${id}`
};

export {
  ROUTES,
  ADMINISTRATOR,
  FREEPOST,
};
