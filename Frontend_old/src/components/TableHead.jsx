import React, { useEffect, useState } from 'react'
import { getTasks } from '../api.js'

function TableHead({ setTasks, isOpenStateModal }) {
    const [themeValue, setThemeValue] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const [startValue, setStartValue] = useState('')
    const [durationValue, setDurationValue] = useState('')
    const [reportValue, setReportValue] = useState('')
    const [pagesValue, setPagesValue] = useState('')
    const [performerValue, setPerformerValue] = useState('')
    const [endValue, setEndValue] = useState('')

    const columns = [
        {
            id: 'theme',
            title: 'Тема',
            isFilter: true,
            value: themeValue
        },
        {
            id: 'title',
            title: 'Наименование',
            isFilter: false,
            value: titleValue
        },
        {
            id: 'performer',
            title: 'Исполнитель',
            isFilter: true,
            value: performerValue
        },
        {
            id: 'start',
            title: 'Начало',
            isFilter: false,
            value: startValue
        },
        {
            id: 'duration',
            title: 'Продолжительности',
            isFilter: false,
            value: durationValue
        },
        {
            id: 'end',
            title: 'Окончание',
            isFilter: true,
            value: endValue
        },
        {
            id: 'report',
            title: 'Номер ЛЗ',
            isFilter: false,
            value: reportValue
        },
        {
            id: 'pages',
            title: 'Количество листов',
            isFilter: false,
            value: pagesValue
        },
    ]

    const rerender = (theme = '', performer = '', end = '', start = '', title = '', duration = '', report = '', pages = '') => {
        getTasks(theme, performer, end, start, title, duration, report, pages)
            .then(tasks => {
                setTasks(tasks)
            })
    }

    useEffect(() => rerender(themeValue, performerValue, endValue, titleValue, startValue, durationValue, reportValue, pagesValue), [
        themeValue,
        performerValue,
        endValue,
        titleValue,
        startValue,
        durationValue,
        reportValue,
        pagesValue,
        isOpenStateModal[0]
    ])

    const inputHandler = (e, column) => {
        if (column.isFilter) {
            switch (column.id) {
                case 'theme':
                    setThemeValue(e.target.value)
                    break
                case 'performer':
                    setPerformerValue(e.target.value)
                    break
                case 'end':
                    setEndValue(e.target.value)
                    break
                case 'start':
                    setStartValue(e.target.value)
                    break
                case 'duration':
                    setDurationValue(e.target.value)
                    break
                case 'title':
                    setTitleValue(e.target.value)
                    break
                case 'report':
                    setReportValue(e.target.value)
                    break
                case 'pages':
                    setPagesValue(e.target.value)
                    break
            }
        }
    }

    return (
        <thead className="tasks-section__tablehead">
            <tr className="tasks-section__row tasks-section__row-head">
                {columns.map(column => (<th key={column.id} className="tasks-section__head tasks-section__head-title">{column.title}</th>))}
            </tr>
            <tr className="tasks-section__row tasks-section__row-head">
                {columns.map(column => (
                    <th key={column.id} className="tasks-section__head tasks-section__head-input">
                        <input onInput={(e) => inputHandler(e, column)} className="tasks-section__input" type="text" placeholder="Поиск" value={column.value} />
                    </th>))}
            </tr>
        </thead>
    )
}

export default TableHead