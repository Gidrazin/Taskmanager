import "./TableBody.scss";
import { Task } from "../../types";
import { dateFormat } from "../../utils/dateUtils";
import { getStatus } from "../../utils/getStatus";

interface Props {
  tasks: Task[];
}

const TableBody = ({ tasks }: Props) => {
  return (
    <tbody className="table__body">
      {tasks.map((task) => (
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
          <td className="table__body-ceil">{dateFormat(task.end).tableDate}</td>
          <td className="table__body-ceil">{task.report ? task.report : ""}</td>
          <td className="table__body-ceil">{task.pages ? task.pages : ""}</td>
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
