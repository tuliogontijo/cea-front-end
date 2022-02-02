import { Empty } from "antd";

const EmptyState = () => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Ops... não há dados aqui :("
    />
  );
}

export default EmptyState;
