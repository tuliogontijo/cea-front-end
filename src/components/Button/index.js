const Button = ({ type, children, stylesButton, handleClick, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`button ${stylesButton}`}
    >
      {children}
    </button>
  );
}

export default Button;
