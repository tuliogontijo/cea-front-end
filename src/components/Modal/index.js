import { Modal as ModalAntd } from "antd";

import { formatFooter } from "./utils/formatFooter";

import "./styles.less";

const Modal = ({
  title,
  visible,
  buttons,
  children,
  onCloseModal,
  width
}) => {

  const footerButtons = formatFooter(buttons);

  return (
    <ModalAntd
      centered
      title = {title}
      visible={visible}
      destroyOnClose={true}
      footer={footerButtons}
      onCancel={onCloseModal}
      width={width}
    >
      <div className="content-modal">
        {children}
      </div>
    </ModalAntd>
  );
}

export default Modal;
