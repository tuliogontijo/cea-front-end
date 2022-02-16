import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "antd";
import { EditOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";

import Modal from "../../components/Modal";
import ProTable from "../../components/ProTable";
import ActionTable from "../../components/ActionTable";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { DATA_MOCK } from "./mocks/data";

import "./styles.css";

const routes = [
  {
    active: false,
    path: "/administradores",
    breadcrumbName: "Administradores",
  },
  {
    active: true,
    path: "/listagem",
    breadcrumbName: "Listagem",
  }
];

const AdministratorList = () => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const navigateAdministratorRegister = () => navigate("/administradores/cadastro");

  const handleEdit = (record) => navigate(`/administradores/edicao/${record.id}`);

  const handleClose = () => setOpenModal(false);
  const onOkModal = () => console.log("Finalizar com sucesso");

  const buttonsModal = [
    {
      styles: "",
      text: "Finalizar",
      handleClick: onOkModal,
    }
  ];

  const actionsTable = [
    {
      name: "Editar",
      func: handleEdit,
      icon: <EditOutlined className="iconUpdate" />,
    },
    {
      name: "Deletar",
      func: () => setOpenModal(true),
      icon: <DeleteFilled className="iconDelete" />,
    }
  ];

  const columns = [
    {
      title: "Nome de Acesso",
      dataIndex: "username",
      width: "200px",
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Nome Completo",
      key: "name",
      width: "auto",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      width: "160px",
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Ações",
      valueType: "option",
      width: "230px",
      render: ({ props }) => <ActionTable actions={actionsTable} record={props.record} />,
    }
  ];
  
  return (
    <div>
      <PageHeader
        title="Listagem de Administradores"
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />

      <div className="containerTable">
        <ProTable
          rowKey="id"
          columns={columns}
          dataSource={DATA_MOCK}
          textButton="Cadastrar Novo"
          stylesButton="buttonPrimary"
          iconButton={<PlusOutlined />}
          actionButton={navigateAdministratorRegister}
          request={(params) => console.log("FAZER REQUISIÇÃO", params)}
        />
      </div>

      <Modal
        visible={openModal}
        buttons={buttonsModal}
        onCloseModal={handleClose}
      >
        <p>
          Aqui haverá o conteúdo da Modal de forma dinâmica
        </p>
      </Modal>
    </div>
  );
}

export default AdministratorList;
