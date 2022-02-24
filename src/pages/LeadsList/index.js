import { PageHeader } from "antd";
import { ExportOutlined  } from "@ant-design/icons"
import ProTable from "../../components/ProTable";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { DATA_MOCK } from "./mocks/data";

import "./styles.css";

const routes = [

    {
        active: false,
        path: "/leads",
        breadcrumbName: "Leads"
    },
    {
        active: true,
        path: "/listagem",
        breadcrumbName: "Listagem"
    }
];

const columns = [
    {
        title: "Telefone",
        dataIndex: "phone",
        hideInSearch: true,
        ellipsis: true,
    },
    {
        title: "Nome",
        key: "name",
        dataIndex: "name",
        ellipsis: true,
    },
    {
        title: "E-mail",
        key: "email",
        dataIndex: "email",
        ellipsis: true,
    },

    {
        title: "Data de Criação",
        dataIndex: "createdAt",
        hideInSearch: true,
        ellipsis: true,
    },
];

const LeadsList = () => {
   
    return (
        <div>
            <PageHeader
                title="Listagem de Leads"
                breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
            />
            <div className="containerTable">
                <ProTable
                    search={false}
                    rowKey="id"
                    columns={columns}
                    dataSource={DATA_MOCK}
                    textButton="Exportar"
                    iconButton={<ExportOutlined className="iconPadding"/>}
                    typeButton="export"
                    request={() => console.log("FAZER REQUISIÇÃO")}
                />
            </div>
        </div>
    );

}
export default LeadsList