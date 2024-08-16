import "./TableHead.scss";
import TableHeadItem from "./TableHeadItem";

const TableHead = () => {
  const tableHeadArray = [
    {
      title: 'Тема',
      hasSort: false
    },
    {
      title: 'Наименование',
      hasSort: true
    },
    {
      title: 'ФИО',
      hasSort: true
    },
    {
      title: 'Срок',
      hasSort: true
    },
    {
      title: 'Номер ЛЗ',
      hasSort: false
    },
    {
      title: 'Стр',
      hasSort: true
    },
  ]
  return (
    <thead className="table__head">
      <tr className="table__head-row">
        {
          tableHeadArray.map((tableHeadArrayItem, index) => (
            <TableHeadItem
              key={index}
              title={tableHeadArrayItem.title}
              hasSort={tableHeadArrayItem.hasSort}
            />
          ))
        }
      </tr>
    </thead>
  );
};
export default TableHead;
