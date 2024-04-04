import React, { useEffect, useState, useRef } from 'react'

import TableHead from './TableHead.jsx'
import TableBody from './TableBody.jsx'
import ControlPanel from './ControlPanel.jsx'
import Modal from './Modal.jsx'
import { getTasks } from '../api.js'

function App() {
    const [tasks, setTasks] = useState([])

    const isOpenStateModal = useState(false)
    const [FormComponent, setFormComponent] = useState(<></>)

    useEffect(() => {
        getTasks().then(tasks => setTasks(tasks))
    }, [])  

    return (
        <>
            {isOpenStateModal[0] && <Modal FormComponent={FormComponent} />}
            <ControlPanel
                tasksLength={tasks.length}
                setFormComponent={setFormComponent}
                isOpenStateModal={isOpenStateModal}
                setTasks={setTasks} />
            <table className="tasks-section__table">
                <TableHead setTasks={setTasks} isOpenStateModal={isOpenStateModal} />
                <TableBody
                    tasks={tasks}
                    setTasks={setTasks}
                    setFormComponent={setFormComponent}
                    isOpenStateModal={isOpenStateModal} />
            </table>
        </>
    )
}

export default App