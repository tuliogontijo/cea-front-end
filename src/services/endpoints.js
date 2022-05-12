import { formatQuery } from "../utils/formatQuery";

const ADMINISTRATOR = "Administrator";
const FREEPOST = "Freepost";
const LEADS = "Leads";
const AUTH = "Auth";
const EXCLUSIVEPOST = "Exclusivepost";

const ROUTES = [];

ROUTES[ADMINISTRATOR] = {
  listPerPage: (queries) => `/admin/administrators/?${formatQuery(queries)}`,
  create: () => "/admin/administrators/",
  update: (id) => `/admin/administrators/${id}`,
  delete: (id) => `/admin/administrators/${id}`,
};

ROUTES[FREEPOST] = {
  listPerPage: (queries) => `/admin/free-posts/?${formatQuery(queries)}`,
  create: () => "/admin/free-posts/",
  update: (id) => `/admin/free-posts/${id}`,
  delete: (id) => `/admin/free-posts/${id}`,
};

ROUTES[LEADS] = {
  listPerPage: (queries) => `/admin/leads/?${formatQuery(queries)}`,
  listAll: () => "/admin/leads/all",
};

ROUTES[AUTH] = {
  login: () => "/admin/login",
};

ROUTES[EXCLUSIVEPOST] = {
  listPerPage: (queries) => `/admin/exclusive-posts/?${formatQuery(queries)}`,
  inative: (id) => `/admin/exclusive-posts/${id}`,
  createContent: () => '/admin/exclusive-posts/content',
  createSurvey: () => '/admin/exclusive-posts/survey',
  findMedia: (id) => `/admin/media/exclusive-post/${id}`,
  findPollTopics: (id) => `/admin/poll-topics/exclusive-post/${id}`,
  editContent: (id) => `/admin/exclusive-posts/content/${id}`,
  editSurvey: (id) => `/admin/exclusive-posts/survey/${id}`,
}

export {
  ROUTES,
  ADMINISTRATOR,
  FREEPOST,
  LEADS,
  AUTH,
  EXCLUSIVEPOST,
};
