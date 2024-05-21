import { ConfigProvider, Pagination } from "antd";
import { Task } from "../../types";
import { tasksMaxRender } from "../../config";
import "./PaginationBlock.scss";

interface Props {
  tasks: Task[];
  setTasksStartRender: Function;
}

const PaginationBlock = ({ tasks, setTasksStartRender }: Props) => {
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
          },
        }}
      >
        <Pagination
          onChange={(page, pageSize) => {
            setTasksStartRender(() => (page - 1) * pageSize);
          }}
          defaultPageSize={tasksMaxRender}
          pageSize={tasksMaxRender}
          defaultCurrent={1}
          total={tasks.length}
        />
      </ConfigProvider>
    </div>
  );
};
export default PaginationBlock;
