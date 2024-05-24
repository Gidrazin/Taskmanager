import "./TableBody.scss";
import { Task } from "../../types";
import { dateFormat } from "../../utils/dateUtils";
import { getStatus } from "../../utils/getStatus";
import { tasksMaxRender } from "../../config";
import TaskForm from "../Forms/TaskForm";
import { Theme, Performer } from "../../types";
import { Tooltip } from "antd";

interface Props {
  tasks: Task[];
  tasksStartRender: number;
  setAppForm: Function;
  themes: Theme[];
  performers: Performer[];
  openNotification: Function;
}

const TableBody = ({
  tasks,
  tasksStartRender,
  setAppForm,
  themes,
  performers,
  openNotification,
}: Props) => {
  console.log(tasks);
  return (
    <tbody className="table__body">
      {tasks
        //Фильтры пагинации
        .filter((_, index) => index >= tasksStartRender)
        .filter((_, index) => index < tasksMaxRender)
        //Мапинг тасков
        .map((task) => (
          <tr
            key={task.id}
            className={`table__body-row table__body-row--${getStatus(
              !!task.report,
              !!task.performer
            )}`}
          >
            <td className="table__body-ceil">{task.theme.slug}</td>
            <Tooltip title="Редактировать">
              <td
                onClick={() =>
                  setAppForm(
                    <TaskForm
                      setAppForm={setAppForm}
                      themes={themes}
                      performers={performers}
                      openNotification={openNotification}
                      formState={{
                        id: task.id,
                        theme: task.theme,
                        title: task.title,
                        performer: task.performer,
                        end: task.end,
                        report: task.report,
                        pages: task.pages,
                      }}
                    ></TaskForm>
                  )
                }
                className="table__body-ceil table__body-ceil--clickable"
              >
                {task.title}
              </td>
            </Tooltip>

            <td className="table__body-ceil">
              {task.performer
                ? task.performer.first_name + " " + task.performer.last_name
                : ""}
            </td>
            <td className="table__body-ceil">
              {task.end && dateFormat(task.end).tableDate}
            </td>
            <td className="table__body-ceil">
              {task.report ? task.report : ""}
            </td>
            <td className="table__body-ceil">{task.pages ? task.pages : ""}</td>
          </tr>
        ))}
    </tbody>
  );
};
export default TableBody;
