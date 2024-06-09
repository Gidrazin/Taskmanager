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
  const ceilClass = (task: Task) =>
    `table__body-ceil table__body-ceil--${getStatus(
      !!task.report,
      !!task.performer
    )}`;
  return (
    <tbody className="table__body">
      {tasks
        //Фильтры пагинации
        .filter((_, index) => index >= tasksStartRender)
        .filter((_, index) => index < tasksMaxRender)
        //Мапинг тасков
        .map((task) => (
          <tr key={task.id} className="table__body-row">
            <td className={ceilClass(task)}>{task.theme.slug}</td>
            <Tooltip placement="left" title={task.title}>
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
                className={`${ceilClass(task)} table__body-ceil--clickable`}
              >
                {task.title}
              </td>
            </Tooltip>

            <td className={ceilClass(task)}>
              {task.performer
                ? task.performer.first_name + " " + task.performer.last_name
                : "\u00A0"}
            </td>
            <td className={ceilClass(task)}>
              {task.end && dateFormat(task.end).tableDate}
            </td>
            <td className={ceilClass(task)}>
              {task.report ? task.report : "\u00A0"}
            </td>
            <td className={ceilClass(task)}>
              {task.pages ? task.pages : "\u00A0"}
            </td>
          </tr>
        ))}
    </tbody>
  );
};
export default TableBody;
