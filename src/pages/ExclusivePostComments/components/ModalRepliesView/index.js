import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Input, Divider } from 'antd';

import Modal from "../../../../components/Modal";
import Replies from "../Replies"
import Button from "../../../../components/Button";

import styles from "./styles.module.css";

const { TextArea } = Input;

const ModalRepliesView = ({
  title,
  visible,
  onCloseModal,
  data,
  handleFileReply,
  handleSendReply,
  commentData
}) => {

  const buttons = [
    {
      text: "Fechar",
      styles: "buttonDefault",
      handleClick: () => onCloseModal("replies")
    },
  ]

  const [replyText, setReplyText] = useState('');

  return (

    <Modal
      title={title}
      buttons={buttons}
      visible={visible}
      onCloseModal={onCloseModal}
      data={data}
      width={"80vw"}
      bodyStyle={{ height: "calc(90vh - 154px)", paddingBottom: 0 }}
      handleSendReply={handleSendReply}
      handleFileReply={handleFileReply}
      commentData={commentData}
    >
      <Replies
        data={data?.content}
        handleFileReply={handleFileReply}
      />
      <div className={styles.inputContainer}>
        <Divider className={styles.dividerReplies} />
        <div className={styles.form}>
          <TextArea
            maxLength={255}
            autoSize={{ minRows: 1, maxRows: 3 }}
            placeholder="Digite sua resposta aqui!"
            onChange={(e) => setReplyText(e.target.value)}
            value={replyText}
            showCount
            allowClear
            autoFocus
          />
          <Button
            type="text"
            stylesButton={`buttonBackground ${styles.sendButton}`}
            handleClick={() => { handleSendReply(commentData.id, replyText), setReplyText("") }}
          >
            <SendOutlined
              className={styles.iconSend}
            />
          </Button>
        </div>
      </div>
    </Modal>
  )
}
export default ModalRepliesView;