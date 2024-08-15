import "./TableHead.scss";
import TableHeadItem from "./TableHeadItem";

const TableHead = () => {
  const tableHeadArray = [
    {
      title: 'Тема'
    },
    {
      title: 'Наименование'
    },
    {
      title: 'ФИО'
    },
    {
      title: 'Срок'
    },
    {
      title: 'Номер ЛЗ'
    },
    {
      title: 'Стр'
    },
  ]
  return (
    <thead className="table__head">
      <tr className="table__head-row">
        {
          tableHeadArray.map((tableHeadArrayItem) => <TableHeadItem title={tableHeadArrayItem.title} />)
        }
      </tr>
    </thead>
  );
};
export default TableHead;
