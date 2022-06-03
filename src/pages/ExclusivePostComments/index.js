import styles from "./styles.module.css";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";
import { Input, PageHeader } from "antd";
import Comments from "../../components/Comments"
import Pagination from "../../components/Pagination"



const ExclusivePostComments = () => {
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

  return (
    <div>
      <PageHeader
        title={"Comentários de Conteúdo Exclusivo"}
        breadcrumbRender={() => <RouterBreadcrumb routes={routes} />}
      />
      <div className={styles.containerComments}>

        <Comments
          data={data}
        ></Comments>
        <Pagination
        total={1}
        // hideOnSinglePage={true}
        pageSize={1}
        >
        </Pagination>
  
      </div>

    </div>
  )
}
export default ExclusivePostComments;
