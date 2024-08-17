import { Tooltip } from "antd";
import "../TableHead.scss";
import { MoveDown, MoveUp } from 'lucide-react';
import { SortType } from "../../../types";
const TableHeadItem = ({ title, sort, setTaskSort, taskSort }: { title: string, sort: any, setTaskSort: any, taskSort: SortType }) => {
  return <th className="table__head-ceil">
    <span className="ceit-title">{title}</span>
    {sort.hasSort && (
      <Tooltip title="Сортировка">
        <button onClick={() => {
          setTaskSort((prev: SortType) => {
            if (!prev) return ({
              sortName: sort.sortName,
              sortDirection: 'down'
            })

            if (prev?.sortDirection === 'up') return null

            if (prev?.sortDirection === 'down') return ({
              sortName: sort.sortName,
              sortDirection: 'up'
            })
          })
        }} className="sort-btn">
          <div className="icon-wrapper">
            <MoveDown
              className="moveDown-icon"
              strokeWidth={taskSort?.sortDirection === 'down' 
                && taskSort.sortName === sort.sortName
                ? 3
                : 2
              }
              color={taskSort?.sortDirection === 'down' 
                && taskSort.sortName === sort.sortName
                ? '#0e1c49'
                : "#6f6d72"
              }
              size={20} />
            <MoveUp
              className="moveUp-icon"
              strokeWidth={taskSort?.sortDirection === 'up' 
                && taskSort.sortName === sort.sortName
                ? 3
                : 2
              }
              color={taskSort?.sortDirection === 'up' 
                && taskSort.sortName === sort.sortName
                ? '#0e1c49'
                : "#6f6d72"}
              size={20} />
          </div>
        </button>
      </Tooltip>
    )
    }
  </th>
}

export default TableHeadItem