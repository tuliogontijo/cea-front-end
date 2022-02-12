  
  
import { PageHeader } from "antd";
import { EditOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import {format} from "date-fns";

import ProTable from "../../components/ProTable";
import ActionTable from "../../components/ActionTable";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { DATA_MOCK } from "./mocks/data";

import "./styles.css";
import { useNavigate } from "react-router-dom";

DATA_MOCK.map((freePost) => {
  freePost.status = freePost.status ? "Online" : "Offline";
  freePost.createdAt = format(new Date(freePost.createdAt),"dd/MM/yyyy");
  return null;
});

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

  const navigateFreePostCreator = () => navigate("/conteudo-gratuito/cadastro");

  const handleEdit = (record) => navigate(`/conteudo-gratuito/edicao/${record.id}`);

  const actionsTable = [
    {
      name: "Editar",
      func: handleEdit,
      icon: <EditOutlined className="iconUpdate" />,
    },
    {
      name: "Deletar",
      func: () => console.log("DELETAR"),
      icon: <DeleteFilled className="iconDelete" />,
    }
  ];

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key:"tile",
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
          dataSource={DATA_MOCK}
          textButton="Cadastrar Novo"
          stylesButton="buttonPrimary"
          iconButton={<PlusOutlined />}
          actionButton={navigateFreePostCreator}
          request={() => console.log("FAZER REQUISIÇÃO")}
        />
      </div>
    </div>
  );
}



export default FreePostList;