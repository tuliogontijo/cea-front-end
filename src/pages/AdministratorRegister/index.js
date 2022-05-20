import { createRef, useEffect, useState } from "react";
import { Form, Input, PageHeader } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled, SaveOutlined, ImportOutlined } from "@ant-design/icons";

import Loader from "../../components/Loader";
import Button from "../../components/Button";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import ModalError from "../../components/Modal/components/ModalError";
import ModalSuccess from "../../components/Modal/components/ModalSuccess";

import { formatRoutes } from "./utils/formatRoutes";
import { validateUsername } from "./utils/validateUsername";

import useStore from "../../hooks/useStore";

import { AdministratorService } from "../../services";

import styles from "./styles.module.css";

const { Item } = Form;

const AdministratorRegister = ({ isEdit }) => {
  const { id } = useParams();
  const refForm = createRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [dataCurrent, setDataCurrent] = useState({});
  const [modalError, setModalError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [validChar, setValidChar] = useState({ tipsOne: false, tipsTwo: false, tipsThree: false });

  const routes = formatRoutes(isEdit);
  const titleScreen = !isEdit ? "Cadastro de Administradores" : "Edição de Administradores";

  useEffect(() => {
    form.setFieldsValue({ name: "", username: "" });
    setValidChar({ tipsOne: false, tipsTwo: false, tipsThree: false });
  }, [isEdit]);

  useEffect(() => {
    setDisabledSubmit(!validChar.tipsOne || !validChar.tipsTwo || !validChar.tipsThree);

    if (isEdit && state && !initialValues) {
      const { record } = state;

      form.setFieldsValue({
        name: record?.name,
        username: record?.username,
      });

      setInitialValues(true);
      handleChangeUsername({ target: { value: record?.username }});
    }
  }, [id, isEdit, state, initialValues, form, validChar]);

  useEffect(() => {
    return () => {
      form.resetFields();
      setInitialValues(false);
    }
  }, [form]);

  const handleChangeUsername = ({ target }) => {
    const { value } = target;
    const { tipsOne, tipsTwo, tipsThree } = validateUsername(value);

    setValidChar({ tipsOne, tipsTwo, tipsThree });
  }

  const handleCloseModalSuccess = () => {
    setModalSuccess(false);
    if (isEdit) navigate("/administradores/listagem");
  };

  const handleCloseModalError = () => setModalError(false);

  const onSubmit = async (values) => {
    const { getDataLocalStorage } = useStore();
    const usernameAdmin = getDataLocalStorage("user")?.username;

    const payload = {
      name: values?.name,
      username: values?.username,
      user: usernameAdmin,
    };
    
    try {
      setLoading(true);
      const idUpdate = isEdit ? id : null;
      const operation = isEdit ? AdministratorService.update : AdministratorService.create;
      const { data } = await operation(payload, idUpdate);

      setDataCurrent({ username: data?.username, password: data?.password });
      setModalSuccess(true);

      form.resetFields();
      setValidChar({ tipsOne: false, tipsTwo: false, tipsThree: false });
    } catch (e) {
      const status = e?.request?.status;

      if (status === 400) {
        setMessageError(e?.response?.data?.message);
      }

      setModalError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Loader loading={loading} />

      <PageHeader
        title={titleScreen}
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />

      <div className={styles.containerForm}>
        <Form
          form={form}
          ref={refForm}
          onFinish={onSubmit}
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

          <div className={styles.tipsUsername}>
            <p>
              <span className={styles.tipsIcon}>
                {validChar.tipsOne ? (<CheckCircleFilled />) : (<CloseCircleFilled />)}
              </span>
              O <b>Nome de Acesso</b> deve possuir caracteres especiais como @!#$%&.
            </p>

            <p>
              <span className={styles.tipsIcon}>
                {validChar.tipsTwo ? (<CheckCircleFilled />) : (<CloseCircleFilled />)}
              </span>
              O <b>Nome de Acesso</b> também deve conter letras e números.
            </p>
            <p>
              <span className={styles.tipsIcon}>
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
              disabled={disabledSubmit}
              stylesButton="buttonPrimary"
            >
              <SaveOutlined className="iconActionPage" />
              Salvar
            </Button>
          </div>
        </Form>
      </div>

      <ModalSuccess
        visible={modalSuccess}
        buttons={[{
          styles: "buttonDefault",
          handleClick: handleCloseModalSuccess,
          text: isEdit ? "Voltar para listagem" : "Fechar",
        }]}
        onCloseModal={handleCloseModalSuccess}
      >
        <div className="modalMessage">
          <p>
            Administrador <b>{dataCurrent?.username}</b> {isEdit ? "editado" : "criado"} com sucesso!
          </p>

          {!isEdit && (
            <>
              <p>A senha para o primeiro acesso é:</p>
              <p className="modalMessageAlert">{dataCurrent?.password}</p>
            </>
          )}
        </div>
      </ModalSuccess>

      <ModalError
        visible={modalError}
        buttons={[{
          text: "Fechar",
          styles: "buttonDefault",
          handleClick: handleCloseModalError,
        }]}
        onCloseModal={handleCloseModalError}
      >
        <div className="modalMessage">
          <p>Falha ao {isEdit ? "editar" : "criar"} administrador!</p>

          <p>Messagem de erro:</p>
          <p className="modalMessageAlert">
            {messageError || "Não identificado."}
          </p>

          <p>
            {!messageError && "Entre em contato com a equipe de desenvolvimento."}
          </p>
        </div>
      </ModalError>
    </div>
  );
}

export default AdministratorRegister;
