import "./styles.css";

const ActionTable = ({ actions, record }) => {
  return (
    <div className="containerActions">
      {actions && actions.map((action) => (
          <button key={action.name} type="button" onClick={() => action.func(record)}>
            <span className="iconAction">{action.icon}</span>
            <span className="textAction">{action.name}</span>
          </button>
      ))}
    </div>
  );
}

export default ActionTable;
