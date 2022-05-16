import Modal from "../..";
import Progress from "../Progress"
const ModalProgress = ({ title, buttons, visible, onCloseModal, data }) => {

  return (
    <Modal
      title={title}
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
    >
      <Progress data={data} />
    </Modal>
  );
}

export default ModalProgress;