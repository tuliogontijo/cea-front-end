const ContentModalErrorImport = () => {
  return (
    <div className="modalMessage">
      <p className="modalMessageAlert">
        Não foi possível realizar a importação.
      </p>

      <p>
        Verifique se o arquivo é do tipo .csv e se possui a estrutura adequada!
      </p>
    </div>
  );
}

export default ContentModalErrorImport;