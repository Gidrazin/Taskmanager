const dateFormat = (date) => {
    
    try {
        const dateObj = new Date(date)
        const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`
        const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : `${dateObj.getMonth() + 1}`
        const year = `${dateObj.getFullYear()}`
    
        return {
            tableDate: `${day}.${month}.${year}`,
            modalDate: `${year}-${month}-${day}`,
            isoDate: dateObj.toISOString()
        }
    } catch(e) {
        console.log(e.message)
    }
    
}


const dateDiff = (start, end) => {
    const dateObjStart = new Date(start)
    const dateObjEnd = new Date(end)

    const diff = dateObjEnd.getTime() - dateObjStart.getTime()
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    if (diff < 0) {
        return 'Проверьте дату'
    }
    return diffDays
}

export {dateFormat, dateDiff}
