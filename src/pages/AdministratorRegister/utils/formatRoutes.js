export const formatRoutes = (isEdit) => {
  const pathScreen = !isEdit ? "/cadastro" : "/edicao";
  const breadcrumbName = !isEdit ? "Cadastro" : "Edição";

  return [
    {
      active: false,
      path: "/administradores",
      breadcrumbName: "Administradores"
    },
    {
      active: true,
      path: pathScreen,
      breadcrumbName: breadcrumbName
    }
  ];
}
