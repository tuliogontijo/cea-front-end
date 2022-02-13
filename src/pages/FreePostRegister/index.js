import { createRef, useEffect, useState } from "react";
import { Form, Input, PageHeader, Switch, Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ImportOutlined, SaveOutlined } from "@ant-design/icons"
import Button from "../../components/Button";

import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { DATA_MOCK } from "../FreePostList/mocks/data";
import "./styles.css";
const { TextArea } = Input;

const { Item } = Form;

const FreePostRegister = ({ isEdit }) => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [status, setStatus] = useState(false);
  const [imgUrlOk, setImgUrlOk] = useState(true);

  const refForm = createRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();


  useEffect(() => {
    if (isEdit && !initialValues) {
      const freePost = DATA_MOCK.find((post) => post.id === id);
      const imgURledit = isEdit ? freePost.imageUrl : "";
      setImgUrl(imgURledit);

      form.setFieldsValue({
        title: freePost.title,
        description: freePost.description,
        imageUrl: freePost.imageUrl,
        status: freePost.status ? "Online" : "Offline"
      });

      setInitialValues(true);
    }
  }, [isEdit, initialValues, id, form]);

  const pathScreen = !isEdit ? "/cadastro" : "/edicao";
  const breadcrumbName = !isEdit ? "Cadastro" : "Edição";
  const titleScreen = !isEdit ? "Cadastro de Conteúdo Gratuito" : "Edição de Conteúdo Gratuito";

  const routes = [
    {
      active: false,
      path: "/conteudo-gratuito",
      breadcrumbName: "Conteúdo Gratuito"
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

  const handleBlur = (e) => {
    setImgUrl(e.target.value);
    setImgUrlOk(true);
  }

  const handleSwitchStatus = () => {
    setStatus(!status);
  }

  const handleImgUrlError = () => {
    setImgUrlOk(!imgUrlOk);
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
            required
            name="status"
            label="Status da publicação:"
            className="switch"
          >
            <Switch
              checkedChildren="Online"
              unCheckedChildren="Offline"
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
    </div>
  );
}

export default FreePostRegister;
