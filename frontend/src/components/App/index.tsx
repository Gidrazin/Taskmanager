import "./App.scss";

import { useState, useEffect } from "react";
import { getTasks, getThemes, getPerformers } from "../../api";
import { Performer, Task, Theme, SortType } from "../../types";

import AddTaskBtn from "../Create-btn";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import PaginationBlock from "../PaginationBlock";
import TaskForm from "../Forms/TaskForm";
import FilterCheckbox from "../FilterCheckbox";

import { ConfigProvider, notification } from "antd";

import { getTaskByStatus } from "../../utils/statusUtils";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  const [themes, setThemes] = useState<Theme[]>([]);
  const [performers, setPerformers] = useState<Performer[]>([]);

  const [tasksStartRender, setTasksStartTender] = useState(0);

  const [appForm, setAppForm] = useState(<></>);

  const [sizePageValue, setSizePageValue] = useState(10)

  const [api, contextHolder] = notification.useNotification();

  const [doneFilter, setDoneFilter] = useState(true)
  const [announcedFilter, setAnnouncedFilter] = useState(true)
  const [inProgressFilter, setInProgressFilter] = useState(true)

  const [taskSort, setTaskSort] = useState<SortType>(null)

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
    const filterArray: string[] = []

    doneFilter
      ? filterArray.push('done')
      : filterArray.splice(1, filterArray.findIndex((status) => status === 'done'))

    announcedFilter
      ? filterArray.push('announced')
      : filterArray.splice(1, filterArray.findIndex((status) => status === 'announced'))

    inProgressFilter
      ? filterArray.push('inProgress')
      : filterArray.splice(1, filterArray.findIndex((status) => status === 'inProgress'))

    const filteredTasks = getTaskByStatus(tasks, filterArray)
    const sortedTasks = [...filteredTasks]
      // .sort((a, b) => {
      //   switch (taskSort) {
      //     case 'title':
      //       console.log('sorted by title');
      //       break;
      //     case 'username':
      //       console.log('sorted by username');
      //       break;
      //     case 'end':
      //       console.log('sorted by end');
      //       break;
      //     case 'pages':
      //       console.log('sorted by pages');
      //       break;
      //   }
      // })

    setFilteredTasks(sortedTasks)
  }, [tasks, doneFilter, announcedFilter, inProgressFilter, taskSort])

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

      <header className="header">
        <a className="logo" href="/">
          <img className="logo__img" src="/images/logo.png" alt="logo" />
        </a>
        <h2 className="fullName">
          <span>Казанцев Захар</span>
        </h2>
        <AddTaskBtn
          clickHandler={() => {
            setAppForm(
              <TaskForm
                setAppForm={setAppForm}
                themes={themes}
                performers={performers}
                openNotification={openNotification}
                formState={{
                  id: NaN,
                  theme: { id: NaN, slug: "", title: "" },
                  title: "",
                  performer: {
                    id: NaN,
                    username: "",
                    first_name: "",
                    last_name: "",
                    ip: "",
                  },
                  end: "",
                  report: "",
                  pages: null,
                }}
              ></TaskForm>
            );
          }}
        />
      </header>
      <main className="main">
        {appForm}
        <div className="filterBlock">

          <div className="filterBlock__wrapper">
            <div className="filterBlock__title">Фильтр по статусу</div>
            <div className="filterBlock__checkboxList">
              <FilterCheckbox
                onClick={() => { setDoneFilter(!doneFilter) }}
                value={doneFilter}
                type="done"
              />
              <FilterCheckbox
                onClick={() => { setAnnouncedFilter(!announcedFilter) }}
                value={announcedFilter}
                type="announced"
              />
              <FilterCheckbox
                onClick={() => { setInProgressFilter(!inProgressFilter) }}
                value={inProgressFilter}
                type="inProgress"
              />
            </div>
          </div>
        </div>
        <table className="table">
          <TableHead />

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
