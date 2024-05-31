import "./App.scss";

import { useState, useEffect } from "react";
import { getTasks, getThemes, getPerformers } from "../../api";
import { Performer, Task, Theme } from "../../types";

import AddTaskBtn from "../Create-btn";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import PaginationBlock from "../PaginationBlock";
import TaskForm from "../Forms/TaskForm";

import { ConfigProvider, notification } from "antd";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [performers, setPerformers] = useState<Performer[]>([]);

  const [tasksStartRender, setTasksStartTender] = useState(0);

  const [appForm, setAppForm] = useState(<></>);

  const [api, contextHolder] = notification.useNotification();

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
        <div className="table-wrapper">
          <table className="table">
            <TableHead />
            <TableBody
              themes={themes}
              performers={performers}
              openNotification={openNotification}
              setAppForm={setAppForm}
              tasks={tasks}
              tasksStartRender={tasksStartRender}
            />
          </table>
        </div>

        <PaginationBlock
          tasks={tasks}
          setTasksStartRender={setTasksStartTender}
        />
      </main>
    </div>
  );
}

export default App;
