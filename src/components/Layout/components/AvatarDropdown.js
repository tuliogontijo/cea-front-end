import { useContext } from "react";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";

import { Context } from "../../../context/AuthContext";
import useStore from "../../../hooks/useStore";

const AvatarDropdown = () => {
  const { getDataLocalStorage } = useStore();

  const navigate = useNavigate();
  const { handleLogout } = useContext(Context);

  const username = getDataLocalStorage("user")?.username;

  const handleMenuClick = (event) => {
    const { key } = event;

    if (key === "logout") {
      handleLogout();
      navigate("/");
    }
  };

  const menuHeaderDropdown = (
    <Menu key={[]} onClick={handleMenuClick}>
      <Menu.Item key="logout" className="openDropdownText">
        <LogoutOutlined /> Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuHeaderDropdown} arrow={true}>
      <span className="userWelcomeHeader">
        Olá, {username}
        <DownOutlined className="userDownIconHeader" />
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;