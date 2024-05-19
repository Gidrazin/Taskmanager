import "./App.scss";
import CreateBtn from "../Create-btn";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import { useState, useEffect } from "react";
import { getTasks } from "../../api";
import { Task } from "../../types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const getData = async () => {
      const tasksRes = await getTasks();
      setTasks(tasksRes);
    };

    getData();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <a className="logo" href="/">
          <img className="logo__img" src="/images/logo.png" alt="logo" />
        </a>
        <h2 className="fullName">
          <span>Казанцев Захар</span>
        </h2>
        <CreateBtn />
      </header>
      <main className="main">
        <table className="table">
          <TableHead />
          <TableBody tasks={tasks} />
        </table>
      </main>
    </div>
  );
}

export default App;
