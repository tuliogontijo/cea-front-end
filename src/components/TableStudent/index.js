import {Tooltip} from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";

const TableStudent = ({ data }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data && data.map((student, index) => {
            const email = student?.email;
            const message = student?.message;

            const iconStatus = student?.success
              ? <CheckCircleOutlined className={styles.iconSuccess} />
              : <ExclamationCircleOutlined className={styles.iconError} />;

            return (
              <tr key={index}>
                <td>{email}</td>
                <td className={styles.columnMessage}>
                  <Tooltip title={message}>
                    {iconStatus}
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableStudent;