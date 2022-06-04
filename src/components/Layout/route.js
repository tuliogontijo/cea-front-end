import { ProfileOutlined, FormOutlined, TableOutlined, FileTextOutlined, UserOutlined } from "@ant-design/icons";

export const ROUTE = {
  path: "/",
  name: "Home",
  routes: [
    {
      name: "Administradores",
      icon: <FormOutlined />,
      routes: [
        {
          name: "CEA | Administradores | Listagem",
          menuName: "Listagem",
          path: "/administradores/listagem",
        },
        {
          name: "CEA | Administradores | Cadastro",
          menuName: "Cadastro",
          path: "/administradores/cadastro"
        },
      ]
    },
    {
      name: "Conteúdo Gratuito",
      icon: <TableOutlined />,
      routes: [
        {
          name: "CEA | Conteúdo Gratuito | Listagem",
          menuName: "Listagem",
          path: "/conteudo-gratuito/listagem"
        },
        {
          name: "CEA | Conteúdo Gratuito | Cadastro",
          menuName: "Cadastro",
          path: "/conteudo-gratuito/cadastro"
        },
      ]
    },
    {
      name: "Conteúdo Exclusivo",
      icon: <FileTextOutlined />,
      routes: [
        {
          name: "CEA | Conteúdo Exclusivo | Listagem",
          menuName: "Listagem",
          path: "/conteudo-exclusivo/listagem"
        },
        {
          name: "CEA | Conteúdo Exclusivo | Cadastro",
          menuName: "Cadastro",
          path: "/conteudo-exclusivo/cadastro"
        }
      ]
    },
    {
      name: "Alunos",
      icon: <UserOutlined />,
      routes: [
        {
          name: "CEA | Alunos | Listagem",
          menuName: "Listagem",
          path: "/alunos/listagem"
        },
      ]
    },
    {
      name: "Leads",
      icon: <ProfileOutlined />,
      routes: [
        {
          name: "CEA | Leads | Listagem",
          menuName: "Listagem",
          path: "/leads/listagem"
        },
      ]
    }
  ]
};
