import { ExclamationCircleOutlined } from "@ant-design/icons";

import Modal from "../..";

import styles from "./styles.module.css";

const ModalError = ({ buttons, visible, onCloseModal, children }) => {
  return (
    <Modal
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
    >
      <div className={styles.iconError}>
        <ExclamationCircleOutlined />
      </div>

      {children}
    </Modal>
  );
}

export default ModalError;
