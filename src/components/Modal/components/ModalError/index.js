import { ExclamationCircleOutlined } from "@ant-design/icons";

import Modal from "../..";

import "./styles.css";

const ModalError = ({ buttons, visible, onCloseModal, children }) => {
  return (
    <Modal
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
    >
      <div className="iconError">
        <ExclamationCircleOutlined />
      </div>

      {children}
    </Modal>
  );
}

export default ModalError;
