import { formatQuery } from "../utils/formatQuery";

const ADMINISTRATOR = "Administrator";

const ROUTES = [];

ROUTES[ADMINISTRATOR] = {
  listPerPage: (queries) => `/administrators/?${formatQuery(queries)}`,
  create: () => "/administrators/",
  update: (id) => `/administrators/${id}`,
  delete: (id) => `/administrators/${id}`
};

export {
  ROUTES,
  ADMINISTRATOR,
};
