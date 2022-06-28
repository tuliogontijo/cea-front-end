import { useState, useEffect } from "react";
import { PageHeader, Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

import Comments from "./components/Comments"
import ModalRepliesView from "./components/ModalRepliesView";
import ModalInputComment from "./components/ModalInputComment";

import styles from "./styles.module.css";

const MockComments = {
  "content": [
    {
      "authorId": 1,
      "authorName": "Tulio Gontijo",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 1,
      "socialName": "",
      "text": "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Sapien in monti palavris qui num significa nadis i pareci latim.Paisis, filhis, espiritis santis.",
      "totalCommentsReply": 3
    },
    {
      "authorId": 2,
      "authorName": "Murillo Isidoro",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 2,
      "socialName": "",
      "text": "Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Cevadis im ampola pa arma uma pindureta.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.",
      "totalCommentsReply": 2
    },
    {
      "authorId": 3,
      "authorName": "Cristina Kochmann",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 3,
      "socialName": "",
      "text": "Quem manda na minha terra sou euzis!Copo furadis é disculpa de bebadis, arcu quam euismod magna.Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.",
      "totalCommentsReply": 0
    },
    {
      "authorId": 4,
      "authorName": "Gustavo Dutra",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 4,
      "socialName": "",
      "text": "Paisis, filhis, espiritis santis.Aenean aliquam molestie leo, vitae iaculis nisl.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.",
      "totalCommentsReply": 1
    },
    {
      "authorId": 4,
      "authorName": "Gustavo Dutra",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 5,
      "socialName": "",
      "text": "Paisis, filhis, espiritis santis.Aenean aliquam molestie leo, vitae iaculis nisl.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.",
      "totalCommentsReply": 1
    },
    {
      "authorId": 4,
      "authorName": "Gustavo Dutra",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 6,
      "socialName": "",
      "text": "Paisis, filhis, espiritis santis.Aenean aliquam molestie leo, vitae iaculis nisl.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.",
      "totalCommentsReply": 1
    }
  ],
  "size": 5,
  "totalElements": 6,
  "totalPages": 2
}

const MockReplies = {
  "content": [
    {
      "authorId": 1,
      "authorName": "Tulio Gontijo",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 1,
      "socialName": "",
      "text": "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Sapien in monti palavris qui num significa nadis i pareci latim.Paisis, filhis, espiritis santis.",
      "totalCommentsReply": 3
    },
    {
      "authorId": 2,
      "authorName": "Murillo Isidoro",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 2,
      "socialName": "",
      "text": "Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Cevadis im ampola pa arma uma pindureta.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.",
      "totalCommentsReply": 2
    },
    {
      "authorId": 3,
      "authorName": "Cristina Kochmann",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 3,
      "socialName": "",
      "text": "Quem manda na minha terra sou euzis!Copo furadis é disculpa de bebadis, arcu quam euismod magna.Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.",
      "totalCommentsReply": 0
    },
    {
      "authorId": 4,
      "authorName": "Gustavo Dutra",
      "createdAt": "2022-06-17T12:48:02.316Z",
      "id": 4,
      "socialName": "",
      "text": "Paisis, filhis, espiritis santis.Aenean aliquam molestie leo, vitae iaculis nisl.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.",
      "totalCommentsReply": 1
    }
  ],
  "size": 5,
  "totalElements": 4,
  "totalPages": 1
}

const ExclusivePostComments = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title } = state;

  const [commentsData, setCommentsData] = useState();
  const [modalReplies, setModalReplies] = useState(false);
  const [repliesData, setRepliesData] = useState();
  const [modalInputComment, setModalInputComment] = useState(false);
  const [commentSelected, setCommentSelected] = useState();
  const [modalError, setModalError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalConfirmFile, setModalConfirmFile] = useState(false);
  const [dataToFile, setDataToFile] = useState();
  // const [messageError, setMessageError] = useState({});

  const getCommentsData = async () => {
    // TODO: listar comentários
    return MockComments;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const data = await getCommentsData();
        setCommentsData(data);
      } catch (e) {
        setModalError(true);
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const getRepliesData = async () => {
    // TODO: listar respostas
    return MockReplies;
  }
  const handleOpenModalReplies = async (commentClicked) => {
    setCommentSelected(commentClicked);
    setIsLoading(true)
    try {
      const data = await getRepliesData();
      setRepliesData(data);
      setModalReplies(true)
    }
    catch (e) {
      setModalError(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleOpenModalFileConfirm = (type, id) => {
    setDataToFile({ type, id })
    setModalConfirmFile(true)
  }

  const handleFile = () => {
    //TODO: arquivar comentário
    const { type, id } = dataToFile;
    setIsLoading(true)
    try {
      if (type === "comment") console.log("Arquivar comentário com id: " + id)
      else console.log("Arquivar resposta de comentário com id: " + id)
    } catch (e) {
      setModalError(true)
    } finally {
      setIsLoading(false)
      setModalConfirmFile(false)
    }
  }

  const handleCloseModal = (target) => {
    target === "replies" ? setModalReplies(false) : setModalInputComment(false);
  }

  const handleSendComment = (commentText) => {
    //TODO: enviar comentário
    console.log(`Comentar para a publicação com id: ${id} e texto: ${commentText}`)
    setModalInputComment(false);
  }

  const handleSendReply = (commentId, replyText) => {
    //TODO: enviar resposta de comentário
    console.log(`Responder ao comentário com id: ${commentId} e texto: ${replyText}`)
  }


  const buttonsModalFileConfirm = [
    {
      text: "Fechar",
      styles: "buttonDefault",
      handleClick: () => setModalConfirmFile(false),
    },
    {
      text: "Arquivar",
      styles: "buttonBackground buttonMarginLeft",
      handleClick: handleFile,
    }
  ];


  const routes = [
    {
      active: false,
      path: "/conteudo-exclusivo",
      breadcrumbName: "Conteúdo Exclusivo"
    },
    {
      active: true,
      path: "../../listagem",
      breadcrumbName: "Listagem"
    },
    {
      active: true,
      path: "/comentarios",
      breadcrumbName: "Comentários"
    }
  ];

  return (
    <div className="container">
      <PageHeader
        title={"Comentários do Conteúdo Exclusivo"}
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />
      <div className={styles.containerComments}>

        <div className={styles.postTitle}>
          <h1 style={{ margin: 0 }}>
            Título do conteúdo: <span style={{ fontWeight: 700 }}>{title}</span>
          </h1>
          <Button
            type="text"
            children={"Comentar"}
            stylesButton="buttonPrimary"
            handleClick={() => setModalInputComment(true)}
          />
        </div>

        <Loader loading={isLoading} />

        {!isLoading && (commentsData?.totalElements === 0 ?
          <>
            <EmptyState description="Ops... conteúdo ainda sem comentários" />
            <Button
              type="text"
              children={"Voltar à listagem"}
              stylesButton={`buttonDefault ${styles.buttonBack}`}
              handleClick={() => navigate("../conteudo-exclusivo/listagem")}
            />
          </>
          :
          <>
            <Comments
              data={commentsData?.content}
              handleOpenModalReplies={handleOpenModalReplies}
              handleFileComment={handleOpenModalFileConfirm}
            />

            <div className={styles.paginationContainer}>
              <Pagination
                total={commentsData.totalElements}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} itens`}
                defaultPageSize={commentsData.size}
                defaultCurrent={1}
              />
            </div>
          </>
        )}
      </div>

      <ModalRepliesView
        title={<p>Respostas do comentário de <span style={{ fontWeight: 700 }}>{commentSelected?.authorName}</span></p>}
        commentData={commentSelected}
        data={repliesData}
        visible={modalReplies}
        handleFileReply={handleOpenModalFileConfirm}
        handleSendReply={handleSendReply}
        onCloseModal={() => handleCloseModal('replies')}
      />
      <ModalInputComment
        title={<p>Comentando em: <span style={{ fontWeight: 700 }}>{title}</span></p>}
        visible={modalInputComment}
        onCloseModal={() => handleCloseModal('comment')}
        handleSendComment={handleSendComment}
      />

      <Modal
        visible={modalConfirmFile}
        buttons={buttonsModalFileConfirm}
        onCloseModal={() => setModalConfirmFile(false)}
      >
        <div className="messageModalDelete">
          <ExclamationCircleOutlined />

          <p><b>Atenção!</b></p>
          <p>Tem certeza que deseja arquivar {dataToFile?.type === "comment" ? "este comentário?" : "esta resposta de comentário?"}</p>
        </div>
      </Modal>
    </div >
  );
}
export default ExclusivePostComments;
