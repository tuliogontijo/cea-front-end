import Modal from "../..";
import InputReply from "../IntputReply";

import styles from "./styles.module.css";

const ModalReply = ({ title, buttons, visible, onCloseModal, data, error }) => {

  return (
    <div>
      <Modal
        title={title}
        buttons={buttons}
        visible={visible}
        onCloseModal={onCloseModal}
        data={data}
      >
        {!error && (
          <>
           <InputReply/>
          </>
        )}
        {error && (
          <>
            <ExclamationCircleOutlined className={styles.iconError} />

            <p className={styles.textError}>
              Oops... Não foi possível responder ao comentário. Tente novamente mais tarde!
            </p>
          </>
        )}

      </Modal>
    </div>
  )
}
export default ModalReply;