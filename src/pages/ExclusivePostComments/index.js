import { useState } from "react";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import { Input, PageHeader, Pagination } from "antd";

import Comments from "../../components/Comments"
import ModalRepliesView from "../../components/Modal/components/ModalRepliesView";
import ModalReply from "../../components/Modal/components/ModalReply";


import styles from "./styles.module.css";

const ExclusivePostComments = () => {

  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [messageError, setMessageError] = useState({});
  const [modalReply, setModalReply] = useState(false);
  const [modalRepliesView, setModalRepliesView] = useState(true);
  const [modalRepliesViewError, setModalRepliesViewError] = useState(false);


  const handleCloseModalReply = (id) => {
    setModalReply(trfalseue);
  }
  const handleCloseModalRepliesView = async () => {
    setModalRepliesView(false);
    console.log("Status = " + modalRepliesView)
  }
  const handleArchive = (id) => {
    //arquivar comentário
    console.log("Comentário arquivado. " + id)
  }

  const data = [

    {
      id: "1",
      student: "Murillo",
      replies: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Sapien in monti palavris qui num significa nadis i pareci latim.Paisis, filhis, espiritis santis.",
      createdAt: "2022-04-30T22:30:00.154246"
    },
    {
      id: "2",
      student: "Tulio",
      replies: "Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Cevadis im ampola pa arma uma pindureta.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.",
      createdAt: "2022-04-30T22:30:00.154246"
    },
    {
      id: "3",
      student: "Cristina",
      replies: "Quem manda na minha terra sou euzis!Copo furadis é disculpa de bebadis, arcu quam euismod magna.Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.",
      createdAt: "2022-04-30T22:30:00.154246"
    },
    {
      id: "4",
      student: "Gustavo",
      replies: "Paisis, filhis, espiritis santis.Aenean aliquam molestie leo, vitae iaculis nisl.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.",
      createdAt: "2022-04-30T22:30:00.154246"
    },
  ]
  const titulo = data[0].student + " " + data[0].replies;



  const routes = [
    {
      active: false,
      path: "/comments",
      breadcrumbName: "Conteúdo Exclusivo"
    },
    {
      active: true,
      path: "/comentarios",
      breadcrumbName: "Comentários"
    }
  ];

  const buttons = [
    {

      text: "Arquivar",
      styles: "buttonsModalDelete",
      handleClick: handleArchive
    },
    {
      text: "Fechar",
      styles: "buttonDefault",
      handleClick: handleCloseModalRepliesView
    },
  ]

  return (
    <div>
      <PageHeader
        title={"Comentários do Conteúdo Exclusivo"}
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />
      <div className={styles.containerComments}>

        <span> <h1> Entendendo a Adolescência (titulo do conteúdo exclusivo)</h1></span>
        <Comments
          data={data}
        />

        <Pagination
          total={15}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          defaultPageSize={2}
          defaultCurrent={1}
        />

      </div>

      <ModalRepliesView
        width={1000}
        data={data}
        title={titulo}
        visible={modalRepliesView}
        error={modalRepliesViewError}
        handleClick={handleArchive(data[0].id)}
        className={styles.modalRepliesConteiner}
        buttons={buttons}
      />
      {/* <ModalReply
        data={data}
        title={"Responder ao comentário:"}
        visible={modalReply}
        error={modalRepliesViewError}
        handleClick={handleArchive(data[0].id)}
        buttons={[{
          text: "Fechar",
          styles: "buttonDefault",
          handleClick: handleCloseModalReply
        }]}
      /> */}
    </div>
  );
}
export default ExclusivePostComments;
