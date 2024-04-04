import React from 'react'
import AddForm from './Forms/AddForm.jsx'
function ControlPanel({ tasksLength, setFormComponent, isOpenStateModal, setTasks }) {

    const addBtnHandler = () => {
        isOpenStateModal[1](true)
        setFormComponent(<AddForm isOpenStateModal={isOpenStateModal} setTasks={setTasks}/>)
    }

    return (
        <div className="control-panel">
            <button
                onClick={() => addBtnHandler()}
                className="add-task"
            >
                Создать работу
            </button>
            <div className="count-task">Количество задач: <span>{tasksLength}</span></div>
        </div>
    )
}

export default ControlPanel