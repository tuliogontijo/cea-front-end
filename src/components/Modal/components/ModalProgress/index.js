import { ExclamationCircleOutlined } from "@ant-design/icons";

import Modal from "../..";
import Progress from "../Progress";

import styles from "./styles.module.css";

const ModalProgress = ({ title, buttons, visible, onCloseModal, data, error }) => {
  return (
    <Modal
      title={title}
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
    >
      {!error && (<Progress data={data} />)}

      {error && (
        <>
          <ExclamationCircleOutlined className={styles.iconError} />

          <p className={styles.textError}>
            Oops... Não foi possível exibir os dados dessa enquete. Tente novamente mais tarde!
          </p>
        </>
      )}
    </Modal>
  );
}

export default ModalProgress;