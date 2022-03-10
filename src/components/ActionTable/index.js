import styles from "./styles.module.css";

const ActionTable = ({ actions, record }) => {
  return (
    <div className={styles.containerActions}>
      {actions && actions.map((action) => (
          <button key={action.name} type="button" onClick={() => action.func(record)}>
            <span className={styles.iconAction}>{action.icon}</span>
            <span className={styles.iconAction}>{action.name}</span>
          </button>
      ))}
    </div>
  );
}

export default ActionTable;
