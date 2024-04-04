const DOMEN = process.env.NODE_ENV === 'production' ? process.env.PROD_DOMEN : process.env.DEV_DOMEN

async function getTasks(theme = '', performer = '', end = '', start = '', title = '', duration = '', report = '', pages = '') {
    const res = await fetch(`http://${DOMEN}/api/v1/tasks/?search=${theme},${end}&performer=${performer}`, { method: 'GET' })
    const tasks = await res.json()
    return tasks
}

async function getSingleTask(taskId) {
    const resTask = await fetch(`http://${DOMEN}/api/v1/tasks/${taskId}`, { method: 'GET' })
    const task = await resTask.json()
    return task
}

async function getPerformers() {
    const resPerformers = await fetch(`http://${DOMEN}/api/v1/users/`, { method: 'GET' })
    const performers = await resPerformers.json()
    return performers
}

async function getThemes() {
    const resThemes = await fetch(`http://${DOMEN}/api/v1/themes/`, { method: 'GET' })
    const themes = await resThemes.json()
    return themes
}

async function patchTask(id, jsonData) {
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value
    await fetch(`http://${DOMEN}/api/v1/tasks/${id}/`, {
        method: 'PATCH',
        body: jsonData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Token c5554313e28744fa5475e2ba2f5590380026c1b7',
            "X-CSRFToken": token
        }
    })
}

async function postTask(jsonData) {
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value
    await fetch(`http://${DOMEN}/api/v1/tasks/`, {
        method: 'POST',
        body: jsonData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Token c5554313e28744fa5475e2ba2f5590380026c1b7',
            "X-CSRFToken": token
        }
    })
}

export { getTasks, getSingleTask, getPerformers, getThemes, patchTask, postTask }