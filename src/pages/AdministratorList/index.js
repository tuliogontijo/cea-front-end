import { PageHeader } from "antd";
import { EditOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";

import ProTable from "../../components/ProTable";
import ActionTable from "../../components/ActionTable";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { DATA_MOCK } from "./mocks/data";

import "./styles.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const navigateAdministratorRegister = () => navigate("/administradores/cadastro");

  const handleEdit = (record) => navigate(`/administradores/edicao/${record.id}`);

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
      title: "Nome de Acesso",
      dataIndex: "username",
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Nome Completo",
      key: "name",
      dataIndex: "name",
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
          request={() => console.log("FAZER REQUISIÇÃO")}
        />
      </div>
    </div>
  );
}

export default AdministratorList;
