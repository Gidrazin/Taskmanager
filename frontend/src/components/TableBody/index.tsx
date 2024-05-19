import "./TableBody.scss";
import { Task } from "../../types";
import { dateFormat } from "../../utils/dateUtils";
import { getStatus } from "../../utils/getStatus";
import { tasksMaxRender } from "../../config";

interface Props {
  tasks: Task[];
  tasksStartRender: number;
}

const TableBody = ({ tasks, tasksStartRender }: Props) => {
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
            <td className="table__body-ceil">{task.title}</td>
            <td className="table__body-ceil">
              {task.performer
                ? task.performer.first_name + " " + task.performer.last_name
                : ""}
            </td>
            <td className="table__body-ceil">
              {dateFormat(task.end).tableDate}
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
