import { Modal as ModalAntd } from "antd";

import { formatFooter } from "./utils/formatFooter";

import "./styles.less";

const Modal = ({
  title,
  visible,
  buttons,
  children,
  onCloseModal,
  bodyStyle,
  style,
  width
}) => {

  const footerButtons = formatFooter(buttons);

  return (
    <ModalAntd
      centered
      title={title}
      visible={visible}
      destroyOnClose={true}
      footer={footerButtons}
      onCancel={onCloseModal}
      width={width}
      style={style}
      bodyStyle={bodyStyle}
    >
      <div className="content-modal">
        {children}
      </div>
    </ModalAntd>
  );
}

export default Modal;
