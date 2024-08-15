import "../TableHead.scss";
import { MoveDown, MoveUp } from 'lucide-react';
const TableHeadItem = ({ title }: { title: string }) => {
  return <th className="table__head-ceil">
    <span className="ceit-title">{title}</span>
    <button className="sort-btn">
      <MoveDown className="moveDown-icon" strokeWidth={2} color="#6f6d72" size={20} />
      <MoveUp className="moveUp-icon" strokeWidth={2} color="#6f6d72" size={20} />
    </button>
  </th>
}

export default TableHeadItem