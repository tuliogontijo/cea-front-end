import { useRef, useState } from "react";
import { PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteFilled, PlusOutlined, WarningOutlined } from "@ant-design/icons";

import Modal from "../../components/Modal";
import ProTable from "../../components/ProTable";
import ActionTable from "../../components/ActionTable";
import ColumnDateTable from "../../components/ColumnDateTable";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import ModalError from "../../components/Modal/components/ModalError";

import { AdministratorService } from "../../services";

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
  const tableRef = useRef();
  const navigate = useNavigate();

  const [modalError, setModalError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [currentDelete, setCurrentDelete] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const getData = async ({ current, pageSize, name }) => {
    const query = {
      direction: "ASC",
      page: current - 1,
      orderBy: "createdAt",
      linesPerPage: pageSize,
    };

    if (name) query.name = name;
    
    try {
      const { data } = await AdministratorService.listPerPage(query);

      return {
        success: true,
        data: data.content,
        total: data.totalElements,
      };
    } catch (e) {
      setMessageError({
        type: "listar administradores",
        text: "Erro inesperado. Tente novamente mais tarde!"
      });
      setModalError(true);
    }
  }

  const navigateAdministratorRegister = () => navigate("/administradores/cadastro");
  const handleEdit = (record) => navigate(`/administradores/edicao/${record.id}`, { state: { record }});

  const handleCloseModalError = () => setModalError(false);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleDelete = async () => {
    const id = currentDelete || "";
    try {
      await AdministratorService.delete(id);

      tableRef.current.reload();
    } catch (e) {
      setMessageError({
        type: "deletar administrador",
        text: "Erro inesperado. Tente novamente mais tarde!"
      });
      setModalError(true);
    } finally {
      setOpenModalDelete(false);
    }
  }

  const buttonsModalDelete = [
    {
      text: "Fechar",
      styles: "buttonDeleteCancel",
      handleClick: handleCloseModalDelete,
    },
    {
      text: "Deletar",
      styles: "buttonConfirm",
      handleClick: handleDelete,
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
      func: (record) => {
        setCurrentDelete(record.id);
        setOpenModalDelete(true);
      },
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
      render: (_, record) => <ColumnDateTable date={record?.createdAt} formatDate="DD/MM/YYYY" adapt />
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
          textButton="Cadastrar Novo"
          stylesButton="buttonPrimary"
          iconButton={<PlusOutlined />}
          actionButton={navigateAdministratorRegister}
          request={getData}
          actionRef={tableRef}
        />
      </div>

      <ModalError
        visible={modalError}
        buttons={[{
          text: "Fechar",
          styles: "buttonModal",
          handleClick: handleCloseModalError,
        }]}
        onCloseModal={handleCloseModalError}
      >
        <div className="messageModalDelete">
          <p>Falha ao {messageError?.type}!</p>

          <p>Messagem de erro:</p>
          <p className="modalMessageAlert">{messageError?.text}</p>
        </div>
      </ModalError>

      <Modal
        visible={openModalDelete}
        buttons={buttonsModalDelete}
        onCloseModal={handleCloseModalDelete}
      >
        <div className="messageModalDelete">
          <WarningOutlined />

          <p><b>Atenção!</b></p>
          <p>Ao deletar o registro atual não é possível recuperá-lo!</p>
        </div>
      </Modal>
    </div>
  );
}

export default AdministratorList;
