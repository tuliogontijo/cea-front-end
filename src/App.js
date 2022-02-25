
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import LeadsList from "./pages/LeadsList";
import FreePostList from "./pages/FreePostList";
import AdministratorList from "./pages/AdministratorList";
import FreePostListRegister from "./pages/FreePostRegister";
import AdministratorRegister from "./pages/AdministratorRegister";

import "./styles/less/common.less";

const PrivateRoute = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  )
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={(
            <PrivateRoute>
              <AdministratorList />
            </PrivateRoute>
          )}
          path="/administradores/listagem"
        />

        <Route
          element={(
            <PrivateRoute>
              <AdministratorRegister />
            </PrivateRoute>
          )}
          path="/administradores/cadastro"
        />

        <Route
          element={(
            <PrivateRoute>
              <AdministratorRegister isEdit />
            </PrivateRoute>
          )}
          path="/administradores/edicao/:id"
        />

        <Route
          element={(
            <PrivateRoute>
              <FreePostList />
            </PrivateRoute>
          )}
          path="/conteudo-gratuito/listagem"
        />

        <Route
          element={(
            <PrivateRoute>
              <FreePostListRegister />
            </PrivateRoute>
          )}
          path="/conteudo-gratuito/cadastro"
        />

        <Route
          element={(
            <PrivateRoute>
              <FreePostListRegister isEdit />
            </PrivateRoute>
          )}
          path="/conteudo-gratuito/edicao/:id"
        />

        <Route
          element={(
            <PrivateRoute>
              <LeadsList />
            </PrivateRoute>
          )}
          path="/leads/listagem"
        />

        <Route
          element={<Login />}
          path="/"
        />
      </Routes >
    </BrowserRouter >
  );
}

export default App;