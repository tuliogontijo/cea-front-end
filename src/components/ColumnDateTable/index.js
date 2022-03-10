import moment from "moment";

const ColumnDateTable = ({ date, formatDate, adapt }) => {
  let value = date;

  if (adapt) value = date && date.split(".")[0];

  return <span>{date ? moment(value).format(formatDate) : "-"}</span>;
}

export default ColumnDateTable;
