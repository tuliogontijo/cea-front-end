import { useContext, useEffect } from "react";

import { Form, Input, Spin, Alert } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined  } from "@ant-design/icons";

import logo from "../../images/logo.png";

import Button from "../../components/Button";

import { Context } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

const { Item } = Form;

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, loading, error, validateSession, handleLogout } = useContext(Context);

  useEffect(() => {
    const { authenticated, isPrimaryAccess } = validateSession();

    if (authenticated && !isPrimaryAccess) {
      return navigate("/administradores/listagem");
    }

    handleLogout();
  }, []);

  const onFinish = async (values) => {
    await handleLogin(values);

    const { isPrimaryAccess } = validateSession();

    if (isPrimaryAccess) {
      return navigate("/recuperacao-senha");
    }

    return navigate("/administradores/listagem");
  };

  const loadingIcon = <LoadingOutlined className={styles.loadingIcon} spin />;

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />
      <h1>Painel Administrativo Comunidade Entendendo a Adolescência</h1>

      {error && (
        <div id="alert-error-auth">
          <Alert
            message="Falha na autenticação!"
            description="Usuário ou senha inválido! Tente novamente mais tarde."
            type="error"
            showIcon
            closable
          />
        </div>
      )}

      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        name="form-auth"
      >
        <Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor, insira seu login!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Login"
            disabled={loading}
          />
        </Item>

        <Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor, insira sua senha!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Senha"
            disabled={loading}
          />
        </Item>

        <Button
          type="submit"
          stylesButton={`buttonPrimary ${styles.buttonSubmit}`}
        >
          {loading ? (<Spin indicator={loadingIcon} />) : "Entrar"}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
