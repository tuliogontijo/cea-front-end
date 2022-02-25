import { CheckCircleOutlined } from "@ant-design/icons";

import Modal from "../..";

import styles from "./styles.module.css";

const ModalSuccess = ({ buttons, visible, onCloseModal, children }) => {
  return (
    <Modal
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
    >
      <div className={styles.iconSuccess}>
        <CheckCircleOutlined color="#018942" />
      </div>

      {children}
    </Modal>
  );
}

export default ModalSuccess;
