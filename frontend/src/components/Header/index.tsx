import { Performer, Theme } from "../../types";

import "./Header.scss";

import AddTaskBtn from "../Create-btn";
import TaskForm from "../Forms/TaskForm";

interface Props {
  setAppForm: any,
  themes: Theme[],
  performers: Performer[]
  openNotification: (type: "success" | "error", text: string) => void
}

const Header = ({setAppForm, themes, performers, openNotification}: Props) => {
  return <header className="header">
    <a className="logo" href="/">
      <img className="logo__img" src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
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
}

export default Header