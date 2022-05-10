import { useContext } from "react";
import { Navigate } from "react-router-dom";

import Layout from "../Layout";

import { Context } from "../../context/AuthContext";
import useStore from "../../hooks/useStore";

const PrivateRoute = ({ children }) => {
  const { removeDataLocalStorage } = useStore();
  const { validateSession } = useContext(Context);

  const { authenticated, isPrimaryAccess } = validateSession();

  if (!authenticated) {
    removeDataLocalStorage("user");
    return <Navigate to="/" />;
  }

  if (isPrimaryAccess) {
    return <Navigate to="/recuperacao-senha" />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  )
};

export default PrivateRoute;
