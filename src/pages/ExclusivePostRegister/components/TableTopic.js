import {Tooltip} from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import styles from "../styles.module.css";

const TableTopic = ({
  data,
  handleEditTopic,
  handleCreateTopic,
  handleDeleteTopic,
  totalVotes,
  errorGetTopics,
}) => {
  const lengthData = data.reduce((sum, value) => {
    if (!value?.remove) {
      sum++;
    }

    return sum;
  }, 0);

  const limitTopics = lengthData === 5;
  const hasVotes = totalVotes > 0;

  const updateButtonMessage = hasVotes ? "Não é possível editar tópico de enquete que já possui votos" : "Editar";
  const deleteButtonMessage = hasVotes ? "Não é possível deletar tópico de enquete que já possui votos" : "Deletar";
  const stylesButtons = hasVotes ? styles.iconMediaDisabled : styles.iconMedia;

  return (
    <table className={styles.tableTopic}>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>N° Votos</th>
        </tr>
      </thead>

      <tbody>
        {!errorGetTopics && data && data.map((topic) => {
          const { id, votes, description, remove } = topic;

          const key = id + "-" + description;

          if (remove) return null;

          return (
            <tr key={key}>
              <td className={styles.descriptionTopic}>
                <Tooltip title={description}>{description}</Tooltip>
              </td>

              <td>{votes}</td>

              <td>
                <Tooltip title={updateButtonMessage}>
                  <EditOutlined
                    className={stylesButtons}
                    onClick={() => !hasVotes && handleEditTopic(description)}
                  />
                </Tooltip>
              </td>

              <td>
                <Tooltip title={deleteButtonMessage}>
                  <DeleteOutlined
                    className={stylesButtons}
                    onClick={() => !hasVotes && handleDeleteTopic(description)}
                  />
                </Tooltip>
              </td>
            </tr>
          );
        })}

        {!errorGetTopics && !limitTopics && !hasVotes && (
          <tr>
            <td
              colSpan={5}
              onClick={handleCreateTopic}
              className={styles.createTopic}
            >
              + Cadastrar novo tópico
            </td>
          </tr>
        )}

        {errorGetTopics && (
          <tr>
            <td
              colSpan={4}
              className={styles.errorGetTopics}
            >
              Erro ao buscar tópicos cadastrados!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableTopic;