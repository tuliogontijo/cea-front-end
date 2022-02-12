
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdministratorList from "./pages/AdministratorList";
import AdministratorRegister from "./pages/AdministratorRegister";
import FreePostList from "./pages/FreePostList";
import FreePostListRegister from "./pages/FreePostRegister";


import "./styles/less/common.less";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            element={<AdministratorList />}
            path="/administradores/listagem"
          />

          <Route
            element={<AdministratorRegister />}
            path="/administradores/cadastro"
          />

          <Route
            element={<AdministratorRegister isEdit />}
            path="/administradores/edicao/:id"
          />

          <Route
            element={<FreePostList />}
            path="/conteudo-gratuito/listagem"
          />
          <Route
            element={<FreePostListRegister />}
            path="/conteudo-gratuito/cadastro"
          />
          {/*  
          <Route
            element={<FreePostListRegister isEdit />}
            path="/conteudo-gratuito/edicao/:id"
          /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
