import Modal from "../..";
import Replies from "../Replies"

const ModalComments = ({ buttons, visible, title, onCloseModal, data }) => {

  const data = [
    {
      id: "1",
      student: "Murillo",
      replies: "quer um halls?"
    },
    {
      id: "2",
      student: "Tulio",
      replies: "Ficou lindo, menino"
    },
    {
      id: "3",
      student: "Gustavo",
      replies: "Me ajuda!?"
    },
    ]
  return (

    <Modal
      buttons={buttons}
      visible={visible}
      title={title}
      onCloseModal={onCloseModal}
      data={data}
    >
      <div>
        <span>{student} &nbsp; {text}</span>
          <h1 className="commentsTitle">Respostas ao comentário:</h1>
          <Replies data={data}/>
      </div>
    </Modal>
  )
}
export default ModalComments;