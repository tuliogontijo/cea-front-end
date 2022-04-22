import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadBox = ({ submit, loading }) => {
  return (
    <Dragger
      name="file"
      maxCount={1}
      multiple={false}
      disabled={loading}
      showUploadList={false}
      customRequest={submit}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>

      <p className="ant-upload-text">
        Clique ou arraste o arquivo <b>.csv</b> para esta área para fazer o upload
      </p>

    </Dragger>
  );
}

export default UploadBox;