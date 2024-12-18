import "./App.scss";

import { useState, useEffect } from "react";
import { getTasks, getThemes, getPerformers } from "../../api";
import { Performer, Task, Theme, SortType, SearchType } from "../../types";

import TableBody from "../TableBody";
import TableHead from "../TableHead";
import PaginationBlock from "../PaginationBlock";
import Header from "../Header";
import SearchBlock from "../SearchBlock";

import { ConfigProvider, notification } from "antd";

import { getTaskByStatus } from "../../utils/statusUtils";
import { themeSortFunc, endSortFunc, pagesSortFunc, titleSortFunc, usernameSortFunc } from "../../utils/sortUtils";
import FilterBlock from "../FilterBlock";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const [themes, setThemes] = useState<Theme[]>([]);
  const [performers, setPerformers] = useState<Performer[]>([]);

  const [tasksStartRender, setTasksStartTender] = useState(0);

  const [appForm, setAppForm] = useState(<></>);

  const [sizePageValue, setSizePageValue] = useState(10);

  const [api, contextHolder] = notification.useNotification();

  const [doneFilter, setDoneFilter] = useState(true);
  const [announcedFilter, setAnnouncedFilter] = useState(true);
  const [inProgressFilter, setInProgressFilter] = useState(true);

  const [taskSort, setTaskSort] = useState<SortType>(null);

  const [openSearchState, setOpenSearchState] = useState({
    isOpen: false,
    isSearchStateNotEmpty: false
  });
  console.log(openSearchState);

  const [searchState, setSearchState] = useState<SearchType>({
    theme: '',
    title: '',
    username: '',
    end: '',
    report: '',
    pages: ''
  });

  const openNotification = (type: "success" | "error", text: string) => {
    api[type]({
      message: text,
      placement: "bottomLeft",
    });
  };

  useEffect(() => {
    const getData = async () => {
      const tasksRes = await getTasks();
      const themesRes = await getThemes();
      const performersRes = await getPerformers();

      setTasks(tasksRes);
      setThemes(themesRes);
      setPerformers(performersRes);
    };

    getData();
  }, [appForm]);

  useEffect(() => {
    const getData = async () => {
      const tasksRes = await getTasks(searchState.theme, searchState.username, searchState.end, searchState.title, searchState.report, searchState.pages);
      setTasks(tasksRes);
    };
    getData();
    setOpenSearchState((prev) => ({
      ...prev, isSearchStateNotEmpty: Object.values(searchState).some((str) => str.length !== 0)
    }))
  }, [searchState]);

  useEffect(() => {
    const filterArray: string[] = [];

    doneFilter
      ? filterArray.push('done')
      : filterArray.splice(1, filterArray.findIndex((status) => status === 'done'));

    announcedFilter
      ? filterArray.push('announced')
      : filterArray.splice(1, filterArray.findIndex((status) => status === 'announced'));

    inProgressFilter
      ? filterArray.push('inProgress')
      : filterArray.splice(1, filterArray.findIndex((status) => status === 'inProgress'));

    const filteredTasks = getTaskByStatus(tasks, filterArray);

    let sortedTasks: Task[] = [];

    switch (taskSort?.sortName) {
      case 'theme':
        sortedTasks = themeSortFunc(filteredTasks, taskSort.sortDirection);
        break;
      case 'title':
        sortedTasks = titleSortFunc(filteredTasks, taskSort.sortDirection);
        break;
      case 'username':
        sortedTasks = usernameSortFunc(filteredTasks, taskSort.sortDirection);
        break;
      case 'end':
        sortedTasks = endSortFunc(filteredTasks, taskSort.sortDirection);
        break;
      case 'pages':
        sortedTasks = pagesSortFunc(filteredTasks, taskSort.sortDirection);
        break;
      default:
        sortedTasks = [...filteredTasks];
    }

    setFilteredTasks(sortedTasks);
  }, [tasks, doneFilter, announcedFilter, inProgressFilter, taskSort]);

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: "#E9E8EE",
            borderRadius: 0,
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>

      <Header
        setAppForm={setAppForm}
        themes={themes}
        performers={performers}
        openNotification={openNotification}
      />

      <main className="main">
        {appForm}
        <FilterBlock

          announcedFilter={announcedFilter}
          doneFilter={doneFilter}
          inProgressFilter={inProgressFilter}

          setAnnouncedFilter={setAnnouncedFilter}
          setDoneFilter={setDoneFilter}
          setInProgressFilter={setInProgressFilter}

          setOpenSearchState={setOpenSearchState}
          openSearchState={openSearchState}

        />
        <div className="table-wrapper">
          <SearchBlock isOpen={openSearchState.isOpen} searchState={searchState} setSearchState={setSearchState} />
          <table className="table">
            <TableHead setTaskSort={setTaskSort} taskSort={taskSort} isOpenSearch={openSearchState.isOpen} />
            <TableBody
              themes={themes}
              performers={performers}
              openNotification={openNotification}
              setAppForm={setAppForm}
              tasks={filteredTasks}
              tasksStartRender={tasksStartRender}
              sizePageValue={sizePageValue}
            />
          </table>
        </div>


        <PaginationBlock
          tasksCount={filteredTasks.length}

          setTasksStartRender={setTasksStartTender}

          sizePageValue={sizePageValue}
          setSizePageValue={setSizePageValue}
        />
      </main>
    </div>
  );
}

export default App;
