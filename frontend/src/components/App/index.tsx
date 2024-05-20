import "./App.scss";

import { useState, useEffect } from "react";
import { getTasks, getThemes, getPerformers, postTask } from "../../api";
import { Performer, Task, Theme } from "../../types";

import AddTaskBtn from "../Create-btn";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import PaginationBlock from "../PaginationBlock";
import AddTask from "../Forms/AddTask";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [performers, setPerformers] = useState<Performer[]>([]);

  const [tasksStartRender, setTasksStartTender] = useState(0);

  const [formType, setFormType] = useState<"addTask" | "updateTask" | null>(
    null
  );

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
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <header className="header">
        <a className="logo" href="/">
          <img className="logo__img" src="/images/logo.png" alt="logo" />
        </a>
        <h2 className="fullName">
          <span>Казанцев Захар</span>
        </h2>
        <AddTaskBtn clickHandler={() => {setFormType('addTask')}} />
      </header>
      <main className="main">
        {!formType ? (
          formType === "addTask"
        ) : (
          <AddTask
            setFormType={setFormType}
            themes={themes}
            performers={performers}
          />
        )}
        <table className="table">
          <TableHead />
          <TableBody tasks={tasks} tasksStartRender={tasksStartRender} />
        </table>
        <PaginationBlock
          tasks={tasks}
          setTasksStartRender={setTasksStartTender}
        />
      </main>
    </div>
  );
}

export default App;
