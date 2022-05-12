export const formatRoutes = (isEdit) => {
  const pathScreen = !isEdit ? "/cadastro" : "/edicao";
  const breadcrumbName = !isEdit ? "Cadastro" : "Edição";

  return [
    {
      active: false,
      path: "/conteudo-exclusivo",
      breadcrumbName: "Conteúdo Exclusivo"
    },
    {
      active: true,
      path: pathScreen,
      breadcrumbName: breadcrumbName
    }
  ];
}
