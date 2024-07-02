import { ConfigProvider, Pagination, InputNumber } from "antd";

import "./PaginationBlock.scss";

interface Props {
  tasksCount: number;
  setTasksStartRender: Function;
  sizePageValue: number
  setSizePageValue: Function
}

const PaginationBlock = ({ tasksCount, setTasksStartRender, sizePageValue, setSizePageValue }: Props) => {
  return (
    <div className="paginationBlock">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemSize: 50,
              colorText: "#E9E8EE",
              colorPrimary: "#E9E8EE",
              colorTextDisabled: "#6F6D72",
              colorBgTextActive: "rgba(14, 28, 73, 0.5)",
              colorBgContainer: "#0E1C49",
              colorPrimaryHover: "E9E8EE",
              colorBgTextHover: "rgba(14, 28, 73, 1)",
            },
            InputNumber: {
              colorText: "#E9E8EE",
              colorPrimary: "#E9E8EE",
              colorTextDisabled: "#6F6D72",
              colorBgTextActive: "rgba(14, 28, 73, 0.5)",
              colorBgContainer: "#0E1C49",
              colorPrimaryHover: "E9E8EE",
              colorBgTextHover: "rgba(14, 28, 73, 1)",
            }
          },
        }}
      >
        <div className="paginationBlock__sizeBlock">
          <span className="paginationBlock__text">Задач на странице:</span>
          <InputNumber min={1} defaultValue={sizePageValue} onChange={(value) => {
            setSizePageValue(value)
          }} />
        </div>
        <Pagination
          onChange={(page, pageSize) => {
            setTasksStartRender(() => (page - 1) * pageSize);
          }}
          defaultPageSize={sizePageValue}
          pageSize={sizePageValue}
          defaultCurrent={1}
          total={tasksCount}
          showSizeChanger={false}
        />
        

      </ConfigProvider>
    </div>
  );
};
export default PaginationBlock;
