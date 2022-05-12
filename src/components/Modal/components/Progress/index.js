import { Progress as ProgressAntd } from "antd";

import styles from "./styles.module.css";

const Progress = ({ data }) => {
  return (
    <>
      {data && data.map((topic) => {
        return (
          <div key={topic?.id} className={styles.container}>
            <span>{`${topic?.description} (${topic?.votes})`}</span>
            <ProgressAntd
              status="normal"
              strokeColor={"#BFB372"}
              percent={topic?.percentageVotes}
            />
          </div>
        );
      })}
    </>
  )
}
export default Progress;