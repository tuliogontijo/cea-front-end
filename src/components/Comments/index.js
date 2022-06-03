import { Divider } from "antd";
import ButtonFooter from "../Modal/components/ButtonFooter";
import styles from "./styles.module.css";
import moment from "moment";

const Comments = ({ data }) => {

  return (
    <>
      {data.length && data.map((comment) => {

        const createdAt = moment(comment?.createdAt).format("DD/MM/YYYY [ às ] HH:mm");
        const replies =  data.length;
        
        return (
          <div key={comment?.id}>
            <span className={styles.studentName}>{comment.student}</span>
            <span> {comment.replies}</span>
            <div className={styles.containerButton}>
              <ButtonFooter
                stylesButton={styles.buttonArchive}
                text={"Responder"}
              // handleClick={handleClick}
              >
              </ButtonFooter>
              <ButtonFooter
                stylesButton={styles.buttonArchive}
                text={"Ver Respostas"}
              // handleClick={handleClick}
              >
              </ButtonFooter>
                <span className={styles.numberOfcoments}>({replies})</span>
              <ButtonFooter
                stylesButton={styles.buttonArchive}
                text={"Arquivar"}
              // handleClick={handleClick}
              >
              </ButtonFooter>
              &nbsp; <span className={styles.createdAtText}>Publicado em {createdAt}</span>
            </div>
            <Divider />
          </div>
        );
      })}
    </>
  )
};

export default Comments;