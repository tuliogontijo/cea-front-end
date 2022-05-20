import { Divider } from "antd";
import ButtonFooter from "../ButtonFooter";


const Replies = ({ data }) => { 

  return (
    <>
      {data && data.map((comment) => {

        return (
          <div key={comment.id}>
            <span>{comment.student}</span> <span>{comment.replies}</span> <span>{comment.crateAt}</span> 
            <ButtonFooter>Arquivar</ButtonFooter>
            <Divider style={width="200"}/>
          </div>
        );
      })}
    </>
  )
};

export default Replies;