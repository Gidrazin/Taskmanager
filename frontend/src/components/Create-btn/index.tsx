import "./CreateBtn.scss";
import { MouseEventHandler } from "react";

const AddTaskBtn = ({
  clickHandler,
}: {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button onClick={clickHandler} className="create-btn">
      <span className="create-btn__text">Создать работу</span>
    </button>
  );
};
export default AddTaskBtn;
