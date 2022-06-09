import InputReply from "../IntputReply";
import moment from "moment";
import styles from "./styles.module.css";

const ReplyForm = ({ data }) => {

  const createdAt = moment(data[0].comment?.createdAt).format("DD/MM/YYYY [ às ] HH:mm");

  return (
    <>
      {/* <span className={styles.createdAtText}>Publicado em {createdAt}</span>
      <span className={styles.studentName}>{data[0].name}</span> */}
      <InputReply/>
    </>
  )

}
export default ReplyForm;