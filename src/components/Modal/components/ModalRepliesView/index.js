import { ExclamationCircleOutlined } from "@ant-design/icons";

import Modal from "../..";
import Replies from "../Replies"
import ReplyForm from "../ReplyForm";

import styles from "./styles.module.css";

const ModalRepliesView = ({ title, buttons, visible, onCloseModal, data, error, width}) => {

  return (

    <Modal
      centered
      title={title}
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
      data={data}
      width={1000}
    >
      {!error && (
        <>
          <h2 className="">Respostas ao comentário:</h2>
          <Replies data={data} />
          <ReplyForm data={data} />
        </>
      )}
      {error && (
        <>
          <ExclamationCircleOutlined className={styles.iconError} />

          <p className={styles.textError}>
            Oops... Não foi possível exibir os comentários. Tente novamente mais tarde!
          </p>
        </>
      )}

    </Modal>
  )
}
export default ModalRepliesView;