import React from 'react'
import { dateFormat, dateDiff } from '../utils/dateUtils.js'
import { getStatus } from '../utils/statusUtils.js'
import ChangeForm from './Forms/ChangeForm.jsx'

function TableBody({ tasks, setTasks, setFormComponent, isOpenStateModal }) {

    const changeBtnHandler = (task) => {
        isOpenStateModal[1](true)
        setFormComponent(<ChangeForm task={task} setTasks={setTasks} isOpenStateModal={isOpenStateModal}/>)
    }

    return (
        <tbody className="tasks-section__table-body">
            {
                tasks.map(task => (
                    <tr key={task.id} className={'tasks-section__row ' + 'tasks-section__row--' + getStatus(task.report, task.performer)}>
                        <td className="tasks-section__column">{!task.theme ? '' : task.theme.slug}</td>
                        <td className="tasks-section__column">
                            <button
                                onClick={() => changeBtnHandler(task)}
                                className="tasks-section__title"
                            >
                                {!task.title ? '' : task.title}
                            </button>
                        </td>
                        <td className="tasks-section__column">{!task.performer ? '' : (task.performer.first_name + ' ' + task.performer.last_name)}</td>
                        <td className="tasks-section__column">{dateFormat(task.start).tableDate}</td>
                        <td className="tasks-section__column">{dateDiff(task.start, task.end)}</td>
                        <td className="tasks-section__column">{dateFormat(task.end).tableDate}</td>
                        <td className="tasks-section__column">{!task.report ? '' : task.report}</td>
                        <td className="tasks-section__column">{!task.pages ? '' : task.pages}</td>
                    </tr>
                )
                )
            }
        </tbody >
    )
}

export default TableBody