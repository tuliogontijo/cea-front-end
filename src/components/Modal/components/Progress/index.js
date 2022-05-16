import { Progress as ProgressAntd } from 'antd';


const Progress = ({ data }) => {
  return (
    <>
      {data && data.map((topic) => {
        console.log(topic)

        return (
          <div key={topic.id}>
            <span>{topic.description}</span>
            <ProgressAntd
              percent={topic.votes}
              strokeColor={"#BFB372"}
            />
          </div>
        );
      })}
    </>
  )
}
export default Progress;