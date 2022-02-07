import ptBR from "antd/lib/locale/pt_BR";
import { enLocale } from "./utils/locale";

import { ConfigProvider } from "antd";
import ProTableAntd, { createIntl, IntlProvider } from "@ant-design/pro-table";
import { CSVLink } from 'react-csv'

import Button from "../Button";
import EmptyState from "../EmptyState";

const ptBRIntl = createIntl("pt-BR", enLocale);

const data = [
  {
    id: "1",
    username: "teste_01",
    name: "Nome Sobrenome 01",
    createdAt: "02/02/2022",
  }]

const ButtonAction = ({
  type,
  actionButton,
  stylesButton,
  iconButton,
  textButton,
}) => {

  if (type === 'export') {
    return (
      <CSVLink data={`${data}`} className="button exportButton">
        {iconButton}
        {`${textButton}`}
      </CSVLink>
    );
  }

  return (
    <Button
      type="type"
      handleClick={actionButton}
      stylesButton={stylesButton}
    >
      {iconButton}
      {` ${textButton}`}
    </Button>
  );
}

const ProTable = ({
  columns,
  request,
  search,
  textButton,
  iconButton,
  dataSource,
  typeButton,
  stylesButton,
  actionButton,
  ...props
}) => {
  const toolbar = {
    actions: [
      (
        <ButtonAction
          actionButton={actionButton}
          iconButton={iconButton}
          stylesButton={stylesButton}
          textButton={textButton}
          type={typeButton}
        />
      )
    ],
    settings: false,
  };

  return (
    <ConfigProvider locale={ptBR}>
      <IntlProvider value={{ intl: ptBRIntl }}>
        <ProTableAntd
          columns={columns}
          request={request}
          toolbar={toolbar}
          dataSource={dataSource}
          pagination={{
            showTotal: (total, range) => {
              return `${range[0]}-${range[1]} de ${total} itens`;
            }
          }}
          locale={{
            emptyText: <EmptyState />,
          }}
          search={search}
          {...props}
        />
      </IntlProvider>
    </ConfigProvider>
  );
}

ProTable.defaultProps = {
  search: true,
};

export default ProTable;
