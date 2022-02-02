import { useState } from "react";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import ProLayout from "@ant-design/pro-layout";
import { useNavigate } from "react-router-dom";
import RightContent from "./components/RightContent";

import { ROUTE } from "./route";

import logo from "../../images/logo.png";

import "./styles.css";

const Layout = ({ children }) => {
  const [collapsed, setCollpased] = useState(false);

  let navigate = useNavigate();

  const handleClickItem = (event) => {
    event.preventDefault();
    const path = event.target.attributes[0].value;
    navigate(path);
  };

  const menuItemRender = (menuItemProps, defaultDOM) => {
    return menuItemProps.isUrl ? (
      defaultDOM
    ) : (
      <a href={menuItemProps.path || "/"} onClick={handleClickItem}>
        {defaultDOM}
      </a>
    );
  };

  return (
    <>
    <ConfigProvider locale={ptBR}>
      <ProLayout
        title=""
        logo={logo}
        route={ROUTE}
        collapsed={collapsed}
        onCollapse={setCollpased}
        menuItemRender={menuItemRender}
        rightContentRender={() => <RightContent />}
      >
        {children}
      </ProLayout>
    </ConfigProvider>
    </>
  );
}

export default Layout;
