import "./styles.css";

const Button = ({ type, children, stylesButton, handleClick }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button ${stylesButton}`}
    >
      {children}
    </button>
  );
}

export default Button;
