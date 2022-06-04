import { useRef, useState, useEffect } from "react";
import { CSVLink } from "react-csv";

import Button from "../Button";

import { LeadService } from "../../services";

const ButtonCSV = ({ textButton, iconButton, stylesButton }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadFinally, setDownloadFinally] = useState(false);

  const csvRef = useRef();

  useEffect(() => {
    if (csvRef?.current && downloadFinally) {
      csvRef.current.link.click();
      setDownloadFinally(false);
    }
  }, [downloadFinally]);

  const headers = [
    {
      label: "Nome",
      key: "name",
    },
    {
      label: "E-mail",
      key: "email",
    },
    {
      label: "Telefone",
      key: "phone",
    },
    {
      label: "Data de Criação",
      key: "createdAt",
    },
  ];

  const getData = async () => {
    try {
      setLoading(true);

      const { data } = await LeadService.listAll();
      setData(data);
      setDownloadFinally(true);

    } finally {
      setData([]);
      setLoading(false);
    }
  };
  
  const textButtonValue = loading ? "Gerando CSV..." : textButton;

  return (
    <>
      <Button
        handleClick={getData}
        stylesButton={stylesButton}
      >
        {iconButton}
        {textButtonValue}
      </Button>

      <CSVLink
        data={data}
        ref={csvRef}
        separator={";"}
        headers={headers}
        className="hidden"
      />
    </>
  );
}

export default ButtonCSV;
