import { ExclamationCircleOutlined } from "@ant-design/icons";

import Modal from "../..";
import Replies from "../Replies"

import styles from "./styles.module.css";

const ModalComments = ({ buttons, visible, title, onCloseModal, data, error }) => {

  return (

    <Modal
      title={title}
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
      data={data}
    >
      {!error && (
        <>
          <h2 className="">Respostas ao comentário:</h2>
          <Replies data={data} />
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
export default ModalComments;