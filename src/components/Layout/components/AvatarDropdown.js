import { Dropdown, Menu } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";

const AvatarDropdown = () => {

  const handleMenuClick = (event) => {
    const { key } = event;

    if (key === "logout") {
      console.log("SAIU");
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
        Olá, Murillo Isidoro
        <DownOutlined className="userDownIconHeader" />
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;