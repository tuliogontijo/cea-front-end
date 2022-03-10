import Button from "../../Button";
import ButtonCSV from "../../ButtonCSV";

const ButtonAction = ({
  type,
  iconButton,
  textButton,
  actionButton,
  stylesButton,
}) => {
  if (type === "export") {
    return (
      <ButtonCSV
        iconButton={iconButton}
        textButton={` ${textButton}`}
        stylesButton={stylesButton}
      />
    );
  }

  return (
    <Button
      type={type}
      handleClick={actionButton}
      stylesButton={stylesButton}
    >
      {iconButton}
      {` ${textButton}`}
    </Button>
  );
}

export default ButtonAction;