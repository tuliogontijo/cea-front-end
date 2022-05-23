import { AlertFilled } from "@ant-design/icons";

const ColumnStatusStudent = ({ status, inactivationSoon }) => {
  const classStyles = inactivationSoon
    ? "iconAlertStatusInativoEmBreve"
    : status ? "iconAlertStatusAtivo" : "iconAlertStatusInativo";

  const description = inactivationSoon ? "Inativo em breve" : status ? "Ativo" : "Inativo";

  return (
    <>
      <AlertFilled className={classStyles} />
      {description}
    </>
  );
}

export default ColumnStatusStudent;