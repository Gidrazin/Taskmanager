import React, { useEffect, useState } from "react";
import { getTasks, getThemes, getPerformers, patchTask } from "../../api";
import { dateFormat } from "../../utils/dateUtils"

function ChangeForm({ task, setTasks, isOpenStateModal }) {
    const [themes, setThemes] = useState([])
    const [performers, setPerformers] = useState([])

    const [title, setTitle] = useState(task.title ? task.title : '')
    const [start, setStart] = useState(task.start ? task.start : '')
    const [end, setEnd] = useState(task.end ? task.end : '')
    const [report, setReport] = useState(task.report ? task.report : '')
    const [pages, setPages] = useState(task.pages ? task.pages : '')

    useEffect(() => {
        getThemes().then(themes => setThemes(themes))
        getPerformers().then(performers => setPerformers(performers))
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const sendItems = {}

        Array.from(e.target.elements)
            .filter((element) => {
                if ((element.name === 'performer')) {
                    return !!element.value && !!element.name
                } else {
                    return !!element.name
                }
            })
            .forEach((element) => sendItems[element.name] = element.value
            )

        sendItems.start = sendItems.start ? dateFormat(sendItems.start).isoDate : Date.now().isoDate
        sendItems.end = sendItems.end ? dateFormat(sendItems.end).isoDate : Date.now().isoDate
        sendItems.pages = sendItems.pages ? sendItems.pages : 0

        patchTask(task.id, JSON.stringify(sendItems)).then(() => {
            getTasks().then(tasks => {
                setTasks(tasks)
                isOpenStateModal[1](false)
            })
        })
    }

    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="modal__header">
                <div className="modal-container">
                    <div className="modal__header-inner">
                        <h2 className="modal__title">Редактирование задачи</h2>
                        <div className="modal__close" onClick={() => {
                            isOpenStateModal[1](false)
                        }}>
                            <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true">
                                <path
                                    d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal__main">
                <div className="modal-container">
                    <ul className="modal__list">
                        <li className="modal__item">
                            <span className="modal__item-field">Тема</span>
                            <select className="modal__item-value" required name="theme">
                                {
                                    <>
                                        <option value=""> -- </option>
                                        {themes.map((themeItem, index) => <option key={index} selected={task.theme && themeItem.slug === task.theme.slug} value={themeItem.slug}>{themeItem.slug + ' - ' + themeItem.title}</option>)}
                                    </>
                                }
                            </select>
                        </li>
                        <li className="modal__item">
                            <span className="modal__item-field">Наименование</span>
                            <input className="modal__item-value" name="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </li>
                        <li className="modal__item">
                            <span className="modal__item-field">Исполнитель</span>
                            <select name="performer" className="modal__item-value">
                                {
                                    <>
                                        <option value=""> -- </option>
                                        {performers.map((performerItem, index) => <option key={index} selected={task.performer && performerItem.username === task.performer.username} value={performerItem.username}>{performerItem.first_name + ' ' + performerItem.last_name}</option>)}
                                    </>
                                }
                            </select>
                        </li>
                        <li className="modal__item">
                            <span className="modal__item-field">Начало</span>
                            <input name="start" type="date" className="modal__item-value" value={dateFormat(start) ? dateFormat(start).modalDate : '' } onChange={(e) => setStart(e.target.value)} />
                        </li>
                        <li className="modal__item">
                            <span className="modal__item-field">Окончание</span>
                            <input name="end" type="date" className="modal__item-value" required value={dateFormat(end) ? dateFormat(end).modalDate : ''} onChange={(e) => setEnd(e.target.value)} />
                        </li>
                        <li className="modal__item">
                            <span className="modal__item-field">Номер ЛЗ</span>
                            <input name="report" type="text" className="modal__item-value" value={report} onChange={(e) => setReport(e.target.value)} />
                        </li>
                        <li className="modal__item">
                            <span className="modal__item-field">Количество листов</span>
                            <input className="modal__item-value" name="pages" type="number" min="0" value={pages} onChange={(e) => setPages(e.target.value)} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="modal__footer">
                <div className="modal-container">
                    <button className="modal__btn" type="submit">Сохранить</button>
                </div>
            </div>
        </form>
    )
}

export default ChangeForm