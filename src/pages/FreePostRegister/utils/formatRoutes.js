export const formatRoutes = (isEdit) => {
  const pathScreen = !isEdit ? "/cadastro" : "/edicao";
  const breadcrumbName = !isEdit ? "Cadastro" : "Edição";

  return [
    {
      active: false,
      path: "/conteudo-gratuito",
      breadcrumbName: "Conteúdo Gratuito"
    },
    {
      active: true,
      path: pathScreen,
      breadcrumbName: breadcrumbName
    }
  ];
}
