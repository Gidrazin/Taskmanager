import { Task } from "../types";

const getStatus = (isReport: boolean, isPerformer: boolean) => {
  if (isReport) {
    return "done";
  } else if (isPerformer) {
    return "inProgress";
  } else {
    return "announced";
  }
}

const getTaskByStatus = (tasks: Task[], filter: string[]) => {
  const statusArr = ["done", "announced", "inProgress"];
  const status = statusArr.filter((status) => filter.includes(status))

  const newTasks = []

  if (status.includes('done')) {
    newTasks.push(...tasks.filter((task) => !!task.report))
  }

  if (status.includes('inProgress')) {
    newTasks.push(...tasks.filter((task) => !!task.performer && !task.report))
  }

  if (status.includes('announced')) {
    newTasks.push(...tasks.filter((task) => !task.performer && !task.report))
  }
  
  return newTasks
}

export { getStatus, getTaskByStatus }