import { createRef, useEffect, useState } from "react";
import { Form, Input, PageHeader } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";

import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import "./styles.css";
import { DATA_MOCK } from "../AdministratorList/mocks/data";

const { Item } = Form;

const AdministratorRegister = ({ isEdit }) => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(false);

  const refForm = createRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && !initialValues) {
      const administrator = DATA_MOCK.find((admin) => admin.id === id);

      form.setFieldsValue({
        name: administrator.name,
        username: administrator.username,
      });

      setInitialValues(true);
    }
  }, [isEdit, initialValues, id, form]);

  const pathScreen = !isEdit ? "/cadastro" : "/edicao";
  const breadcrumbName = !isEdit ? "Cadastro" : "Edição";
  const titleScreen = !isEdit ? "Cadastro de Administradores" : "Edição de Administradores";

  const routes = [
    {
      active: false,
      path: "/administradores",
      breadcrumbName: "Administradores"
    },
    {
      active: true,
      path: pathScreen,
      breadcrumbName: breadcrumbName
    }
  ];

  const onSubmit = (values) => {
    console.log('values form -> ', values);
  }

  return (
    <div>
      <PageHeader
        title={titleScreen}
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />

      <div className="containerForm">
        <Form
          form={form}
          ref={refForm}
          onFinish={onSubmit}
          className="formAntd"
          name="create-administrator-form"
        >
          <Item
            required
            name="name"
            label="Nome Completo"
            rules={[{ required: true, message: "Campo obrigatório! Preencha corretamente!" }]}
          >
            <Input
              placeholder="Informe o nome completo do administrador"
            />
          </Item>

          <Item
            required
            name="username"
            label="Nome de Acesso"
            rules={[{ required: true, message: "Campo obrigatório! Preencha corretamente!" }]}
          >
            <Input
              placeholder="Informe o nome de acesso do administrador"
            />
          </Item>

          <div className="containerButtons">
            <Button
              stylesButton="buttonPrimary"
              handleClick={() => navigate("/administradores/listagem")}
            >
              Voltar
            </Button>

            <Button
              type="submit"
              stylesButton="buttonPrimary"
            >
              Salvar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AdministratorRegister;
