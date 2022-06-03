import {Pagination as PaginationAntd} from "antd";

const Pagination = () => {

  return (
    <PaginationAntd
    hideOnSinglePage={true}
    total={total}
    pageSize={pageSize}
    >
    </PaginationAntd>
  )

}
export default PaginationAntd;