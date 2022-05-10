import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import LeadsList from "./pages/LeadsList";
import FreePostList from "./pages/FreePostList";
import AdministratorList from "./pages/AdministratorList";
import FreePostListRegister from "./pages/FreePostRegister";
import AdministratorRegister from "./pages/AdministratorRegister";

import "./styles/less/common.less";

function App() {
  return (
    <AuthProvider>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;