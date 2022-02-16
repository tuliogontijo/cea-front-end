import { createRef, useEffect, useState } from "react";
import { Form, Input, PageHeader } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled, SaveOutlined, ImportOutlined } from "@ant-design/icons";

import Button from "../../components/Button";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { DATA_MOCK } from "../AdministratorList/mocks/data";

import "./styles.css";

const { Item } = Form;

const AdministratorRegister = ({ isEdit }) => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(false);
  const [validChar, setValidChar] = useState({ tipsOne: false, tipsTwo: false, tipsThree: false });


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

  const handleChangeUsername = ({ target }) => {
    const { value } = target;

    const regexTipsOne = /[@!#$%&_]{1,}/;
    const regexTipsTwoChar = /[a-zA-Z]/;
    const regexTipsTwoNumber = /[0-9]/;
    const regexTipsThree = /\s{1}/;

    setValidChar({
      tipsOne: regexTipsOne.test(value),
      tipsTwo: regexTipsTwoChar.test(value) && regexTipsTwoNumber.test(value),
      tipsThree: value.length !== 0 && !regexTipsThree.test(value),
    });
  }

  const onSubmit = (values) => {
    console.log('valid -> ', validChar);
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
              onChange={handleChangeUsername}
              placeholder="Informe o nome de acesso do administrador"
            />
          </Item>

          <div className="tipsUsername">
            <p>
              <span className="tipsIcon">
                {validChar.tipsOne ? (<CheckCircleFilled />) : (<CloseCircleFilled />)}
              </span>
              O <b>Nome de Acesso</b> deve possuir caracteres especiais como @!#$%&.
            </p>

            <p>
              <span className="tipsIcon">
                {validChar.tipsTwo ? (<CheckCircleFilled />) : (<CloseCircleFilled />)}
              </span>
              O <b>Nome de Acesso</b> também deve conter letras e números.
            </p>
            <p>
              <span className="tipsIcon">
                {validChar.tipsThree ? (<CheckCircleFilled />) : (<CloseCircleFilled />)}
              </span>
              Evite espaço para o <b>Nome de Acesso</b>. Substitua-os por (_).
            </p>
          </div>

          <div className="containerButtons">
            <Button
              stylesButton="buttonBack"
              handleClick={() => navigate("/administradores/listagem")}
            >
              <ImportOutlined className="iconActionPage" />

              Voltar
            </Button>

            <Button
              type="submit"
              stylesButton="buttonPrimary"
            >
              <SaveOutlined className="iconActionPage" />
              Salvar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AdministratorRegister;
