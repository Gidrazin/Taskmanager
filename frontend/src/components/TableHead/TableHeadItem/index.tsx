import { Tooltip } from "antd";
import "../TableHead.scss";
import { MoveDown, MoveUp } from 'lucide-react';
const TableHeadItem = ({ title, hasSort }: { title: string, hasSort: boolean }) => {
  return <th className="table__head-ceil">
    <span className="ceit-title">{title}</span>
    {hasSort && (
      <Tooltip title="Сортировка">
        <button className="sort-btn">
          <div className="icon-wrapper">
            <MoveDown className="moveDown-icon" strokeWidth={2} color="#6f6d72" size={20} />
            <MoveUp className="moveUp-icon" strokeWidth={2} color="#6f6d72" size={20} />
          </div>
          
        </button>
      </Tooltip>

    )
    }
  </th>
}

export default TableHeadItem