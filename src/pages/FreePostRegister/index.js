import { createRef, useEffect, useState } from "react";
import { Form, Input, PageHeader, Switch, Alert } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ImportOutlined, SaveOutlined } from "@ant-design/icons"
import Button from "../../components/Button";

import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import ModalError from "../../components/Modal/components/ModalError";
import ModalSuccess from "../../components/Modal/components/ModalSuccess";

import { formatRoutes } from "./utils/formatRoutes";

import { FreepostService } from "../../services";

import "./styles.css";
const { TextArea } = Input;

const { Item } = Form;

const FreePostRegister = ({ isEdit }) => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [status, setStatus] = useState(false);
  const [imgUrlOk, setImgUrlOk] = useState(true);
  const { state } = useLocation();
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const refForm = createRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();


  useEffect(() => {
    if (isEdit && !initialValues) {
      const { record: freePost } = state;
      setStatus(freePost.status === "online" ? true : false);
      setImgUrl(freePost.imageUrl);

      form.setFieldsValue({
        title: freePost.title,
        description: freePost.description,
        imageUrl: freePost.imageUrl,
        status: freePost.status
      });

      setInitialValues(true);
    }
  }, [isEdit, initialValues, id, form, status, state]);

  useEffect(() => {
    return () => {
      form.resetFields();
      setInitialValues(false);
    }
  }, [form]);

  const titleScreen = !isEdit ? "Cadastro de Conteúdo Gratuito" : "Edição de Conteúdo Gratuito";
  const routes = formatRoutes(isEdit);


  const handleCloseModalSuccess = () => {
    setModalSuccess(false);
    if (isEdit) navigate("/conteudo-gratuito/listagem");
    setImgUrl('');
  };

  const handleCloseModalError = () => setModalError(false);


  const onSubmit = async (values) => {
    const payload = {
      title: values?.title,
      description: values?.description,
      imageUrl: values?.imageUrl,
      status: values?.status ? true : false,
      user: "admin.cea",
    };

    try {
      const idUpdate = isEdit ? id : null;
      const operation = isEdit ? FreepostService.update : FreepostService.create;
      await operation(payload, idUpdate);

      setModalSuccess(true);

      form.resetFields();
    } catch (e) {
      const status = e?.request?.status;

      if (status === 400) {
        setMessageError(e?.response?.data?.message);
      }
      setModalError(true);
    }
  }

  const handleBlur = (e) => {
    setImgUrl(e.target.value);
    setImgUrlOk(true);
  }

  const handleSwitchStatus = () => {
    setStatus(!status);
  }

  const handleImgUrlError = () => {
    setImgUrlOk(false);
    setImgUrl('');
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
          name="create-freepost-form"
        >
          <Item
            required
            name="title"
            label="Título:"
            rules={[{ required: true, message: "Campo obrigatório! Preencha corretamente!" }]}
          >
            <Input
              placeholder="Digite um título"
            />
          </Item>

          <Item
            required
            name="description"
            label="Descrição:"
            rules={[{ required: true, message: "Campo obrigatório! Preencha corretamente!" }]}
          >
            <TextArea
              placeholder="Descrição do conteúdo gratuito"
              rows={4}
              showCount
              maxLength={2000}
            />
          </Item>

          <Item
            required
            name="imageUrl"
            label="URL da imagem:"
            rules={
              [
                { required: true, message: "Campo obrigatório! Preencha corretamente!" },
                { type: 'url', message: "O caminho inserido não é uma URL válida" }
              ]}
          >

            <Input
              placeholder="Informe a URL da imagem (Proporção preferencial: 500x145)"
              onBlur={handleBlur}
            />
          </Item>

          {
            imgUrlOk ? imgUrl ?
              <div className="previewImg">
                <img src={imgUrl} alt="Preview da Imagem" onError={handleImgUrlError} />
              </div>
              :
              <div className="previewImg">Preview da Imagem</div> :
              <Alert
                message="O caminho inserido não contém uma imagem."
                description="Revisar o campo 'URL da imagem'"
                type="warning"
                className="errorImgUrl"
                showIcon
              />
          }

          <Item
            name="status"
            label="Status da publicação:"
            className="switch"
          >
            <Switch
              checkedChildren="Online"
              unCheckedChildren="Offline"
              checked={status}
              onChange={handleSwitchStatus}
              style={status ? { backgroundColor: "green" } : { backgroundColor: "red" }}
            />
          </Item>

          <div className="containerButtons">
            <Button
              stylesButton="buttonBack"
              handleClick={() => navigate("/conteudo-gratuito/listagem")}
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


      <ModalSuccess
        visible={modalSuccess}
        buttons={[{
          styles: "buttonModal",
          handleClick: handleCloseModalSuccess,
          text: isEdit ? "Voltar para listagem" : "Fechar",
        }]}
        onCloseModal={handleCloseModalSuccess}
      >
        <div className="modalMessage">
          <p>
            Conteúdo Gratuito {isEdit ? "editado" : "criado"} com sucesso!
          </p>
        </div>

      </ModalSuccess>

      <ModalError
        visible={modalError}
        buttons={[{
          text: "Fechar",
          styles: "buttonModal",
          handleClick: handleCloseModalError,
        }]}
        onCloseModal={handleCloseModalError}
      >
        <div className="modalMessage">
          <p>Falha ao {isEdit ? "editar" : "criar"} conteúdo gratuito!</p>

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

export default FreePostRegister;
