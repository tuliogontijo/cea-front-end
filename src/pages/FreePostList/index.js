import { useRef, useState } from "react";
import { PageHeader } from "antd";
import { EditOutlined, DeleteFilled, PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { format } from "date-fns";

import ProTable from "../../components/ProTable";
import ActionTable from "../../components/ActionTable";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import Modal from "../../components/Modal";
import ModalError from "../../components/Modal/components/ModalError";

import { FreepostService } from "../../services";

import "./styles.css";
import { useNavigate } from "react-router-dom";

const routes = [
  {
    active: false,
    path: "/conteudo-gratuito",
    breadcrumbName: "Conteúdo Gratuito",
  },
  {
    active: true,
    path: "/listagem",
    breadcrumbName: "Listagem",
  }
];


const FreePostList = () => {
  const navigate = useNavigate();
  const tableRef = useRef();

  const [modalError, setModalError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [currentDelete, setCurrentDelete] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const getData = async ({ current, pageSize, title, status }) => {
    const query = {
      direction: "ASC",
      page: current - 1,
      orderBy: "createdAt",
      linesPerPage: pageSize,
    };

    if (title) query.title = title;
    if (status) query.status = status;

    try {
      const { data } = await FreepostService.listPerPage(query);
      let freeposts = data.content;

      freeposts.map((freepost) => {
        freepost.status = freepost.status ? "online" : "offline";
        freepost.createdAt = format(new Date(freepost.createdAt), "dd/MM/yyyy");
        return null;
      })


      return {
        success: true,
        data: freeposts,
        total: data.totalElements,
      };
    } catch (e) {
      setMessageError({
        type: "listar conteúdo gratuito",
        text: "Erro inesperado. Tente novamente mais tarde!"
      });
      setModalError(true);
    }
  }

  const handleEdit = (record) => navigate(`/conteudo-gratuito/edicao/${record.id}`, { state: { record } });

  const handleCloseModalError = () => setModalError(false);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleDelete = async () => {
    const id = currentDelete || "";
    try {
      await FreepostService.delete(id);

      tableRef.current.reload();
    } catch (e) {
      setMessageError({
        type: "deletar conteúdo gratuito",
        text: "Erro inesperado. Tente novamente mais tarde!"
      });
      setModalError(true);
    } finally {
      setOpenModalDelete(false);
    }
  }


  const navigateFreePostCreator = () => navigate("/conteudo-gratuito/cadastro");

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
      title: "Título",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      valueType: "select",
      valueEnum: {
        all: {
          text: "Todos",
          status: 'Default'
        },
        online: {
          text: 'Online',
          status: 'Success',
        },
        offline: {
          text: 'Offline',
          status: 'Error',
        },
      },
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
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
        title="Listagem de Conteúdos Gratuitos"
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />

      <div className="containerTable">
        <ProTable
          rowKey="id"
          columns={columns}
          textButton="Cadastrar Novo"
          stylesButton="buttonPrimary"
          iconButton={<PlusOutlined />}
          actionButton={navigateFreePostCreator}
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



export default FreePostList;
