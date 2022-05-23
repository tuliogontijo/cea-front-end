import TableStudent from "../../../components/TableStudent";

const ContentModalSuccessImport = ({ data }) => {
  return (
    <div className="modalMessage">
      <p>Detalhamento dos estudantes importados: </p>

      <TableStudent data={data} />
    </div>
  );
}

export default ContentModalSuccessImport;