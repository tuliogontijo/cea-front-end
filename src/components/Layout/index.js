import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import ProLayout from "@ant-design/pro-layout";
import { useNavigate } from "react-router-dom";
import RightContent from "./components/RightContent";

import { ROUTE } from "./route";

import logo from "../../images/logo.png";

const Layout = ({ children }) => {
  const navigate = useNavigate();

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
        {menuItemProps.menuName}
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
        collapsed={false}
        fixedHeader={true}
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
