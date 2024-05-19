import "./TableHead.scss";
const TableHead = () => {
  return (
    <thead className="table__head">
      <tr className="table__head-row">
        <th className="table__head-ceil">Тема</th>
        <th className="table__head-ceil">Наименование</th>
        <th className="table__head-ceil">ФИО</th>
        <th className="table__head-ceil">Финиш</th>
        <th className="table__head-ceil">Номер ЛЗ</th>
        <th className="table__head-ceil">Стр</th>
      </tr>
    </thead>
  );
};
export default TableHead;
