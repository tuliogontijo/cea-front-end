import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";

const Loader = ({ loading }) => {
  const icon = <LoadingOutlined />;

  return loading && (
    <div className={styles.background}>
      <Spin
        size="large"
        indicator={icon}
        className={styles.icon}
      />
    </div>
  );
};

export default Loader;