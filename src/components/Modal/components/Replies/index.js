import { Divider } from "antd";
import ButtonFooter from "../ButtonFooter";
import styles from "./styles.module.css";
import moment from "moment";

const Replies = ({ data }) => {

  return (
    <>
      {data.length && data.map((comment) => {

        const createdAt = moment(comment?.createdAt).format("DD/MM/YYYY [ às ] HH:mm");

        return (
          <div key={comment?.id}>
            <Divider />
            <span className={styles.studentName}>{comment.student}</span>
            <span> {comment.replies}</span>
            <div className={styles.containerButton}>
              <ButtonFooter
                stylesButton={styles.buttonArchive}
                text={"Arquivar"}
              // handleClick={handleClick}
              >
              </ButtonFooter>
              &nbsp; <span className={styles.createdAtText}>Publicado em {createdAt}</span>
            </div>
          </div>
        );
      })}
    </>
  )
};

export default Replies;