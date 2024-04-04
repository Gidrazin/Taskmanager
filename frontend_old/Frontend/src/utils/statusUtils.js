const getStatus = (report, performer) => {
    if (report) {
        return 'done'
    } else if (performer) {
        return 'inProgress'
    } else {
        return 'announced'
    }
}

export {getStatus}