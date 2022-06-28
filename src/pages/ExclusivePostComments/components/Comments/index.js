import { Divider } from "antd";

import Button from "../../../../components/Button";

import moment from "moment";

import styles from "./styles.module.css";
const Comments = ({
  data,
  handleOpenModalReplies,
  handleFileComment
}) => {

  return (
    <>
      {data.map((comment) => {

        const createdAt = moment(comment?.createdAt).format("DD/MM/YYYY [ às ] HH:mm");

        return (

          <div key={comment?.id}>
            <span className={styles.studentName}>{comment.authorName}</span>
            <span> {comment.text} </span>
            <div className={styles.containerButton}>

              {comment.totalCommentsReply > 0 && <Button
                stylesButton={styles.buttonFooter}
                handleClick={() => handleOpenModalReplies(comment)}
              >Ver Respostas ({comment.totalCommentsReply})</Button>}

              <Button
                stylesButton={styles.buttonFooter}
                handleClick={() => handleFileComment("comment", comment.id)}
              >
                Arquivar
              </Button>

              <span className={styles.createdAtText}>Publicado em {createdAt}</span>

            </div>
            <Divider />
          </div>
        );
      })}
    </>
  )
};

export default Comments;