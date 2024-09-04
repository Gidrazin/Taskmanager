import { SortName, SortType } from "../../types";
import "./TableHead.scss";
import TableHeadItem from "./TableHeadItem";

interface Props { setTaskSort: any, taskSort: SortType, isOpenSearch: boolean }


const TableHead = ({ setTaskSort, taskSort, isOpenSearch }: Props) => {
  const tableHeadArray: { title: string, sort: { hasSort: boolean, sortName?: SortName } }[] = [
    {
      title: 'Тема',
      sort: {
        hasSort: true,
        sortName: 'theme'
      }
    },
    {
      title: 'Наименование',
      sort: {
        hasSort: true,
        sortName: 'title'
      }
    },
    {
      title: 'ФИО',
      sort: {
        hasSort: true,
        sortName: 'username'
      }
    },
    {
      title: 'Срок',
      sort: {
        hasSort: true,
        sortName: 'end'
      }
    },
    {
      title: 'Номер ЛЗ',
      sort: {
        hasSort: false
      }
    },
    {
      title: 'Стр',
      sort: {
        hasSort: true,
        sortName: 'pages'
      }
    },
  ]
  return (
    <thead className="table__head">
      <tr className={`table__head-row ${isOpenSearch ? 'table__head-row_searchOpen' : ''}`}>
        {
          tableHeadArray.map((tableHeadArrayItem, index) => (
            <TableHeadItem
              key={index}
              title={tableHeadArrayItem.title}
              sort={tableHeadArrayItem.sort}
              setTaskSort={setTaskSort}
              taskSort={taskSort}
            />
          ))
        }
      </tr>
    </thead>
  );
};
export default TableHead;
