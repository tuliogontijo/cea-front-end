import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import "./styles.css";

const itemRender = (route, _params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;

  if (!route.active) {
    return <span className="disabled-link">{route.breadcrumbName}</span>;
  }

  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join("/")} >{route.breadcrumbName}</Link>
  );
}

const RouterBreadcrumb = ({ routes }) => {
  return <Breadcrumb itemRender={itemRender} routes={routes} />;
}

export default RouterBreadcrumb;
