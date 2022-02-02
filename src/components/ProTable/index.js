import ptBR from "antd/lib/locale/pt_BR";
import { enLocale } from "./utils/locale";

import { ConfigProvider } from "antd";
import ProTableAntd, { createIntl, IntlProvider } from "@ant-design/pro-table";

import Button from "../Button";
import EmptyState from "../EmptyState";

const ptBRIntl = createIntl("pt-BR", enLocale);

const ProTable = ({
  columns,
  request,
  textButton,
  iconButton,
  dataSource,
  stylesButton,
  actionButton,
  ...props
}) => {
  const toolbar = {
    actions: [
      (
        <Button
          type="type"
          handleClick={actionButton}
          stylesButton={stylesButton}
        >
          {iconButton}
          {` ${textButton}`}
        </Button>
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
          {...props}
        />
      </IntlProvider>
    </ConfigProvider>
  );
}

export default ProTable;
