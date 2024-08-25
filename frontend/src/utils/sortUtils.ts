import { SortDirection, Task } from "../types";

export const themeSortFunc = (arr: Task[], direction: SortDirection) => [...arr].sort(
  (a, b) => {
    // Приводим текстовые поля к нижнему регистру для корректного сравнения
    const textA = a['theme']['slug'].toLowerCase();
    const textB = b['theme']['slug'].toLowerCase();

    if (direction === 'up') {
      if (textA > textB) {
        return -1;
      }
      if (textA < textB) {
        return 1;
      }
    }

    if (direction === 'down') {
      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
    }

    return 0; // если строки равны
  }
)

export const titleSortFunc = (arr: Task[], direction: SortDirection) => [...arr].sort(
  (a, b) => {
    // Приводим текстовые поля к нижнему регистру для корректного сравнения
    const textA = a['title'].toLowerCase();
    const textB = b['title'].toLowerCase();

    if (direction === 'up') {
      if (textA > textB) {
        return -1;
      }
      if (textA < textB) {
        return 1;
      }
    }

    if (direction === 'down') {
      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
    }

    return 0; // если строки равны
  }
)


export const usernameSortFunc = (arr: Task[], direction: SortDirection) => [...arr].sort(
  (a, b) => {
    // Приводим текстовые поля к нижнему регистру для корректного сравнения
    if (!a['performer'] || !b['performer']) {
      return 0;
    }
    const textA = a['performer']['first_name'].toLowerCase() + " " + a['performer']['last_name'].toLowerCase();
    const textB = b['performer']['first_name'].toLowerCase() + " " + b['performer']['last_name'].toLowerCase();

    if (direction === 'up') {
      if (textA > textB) {
        return -1;
      }
      if (textA < textB) {
        return 1;
      }
    }

    if (direction === 'down') {
      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
    }

    return 0; // если строки равны
  }
)


export const endSortFunc = (arr: Task[], direction: SortDirection) => [...arr].sort(
  (a, b) => {
    // Преобразуем строки в объекты Date для корректного сравнения
    const dateA = new Date(a["end"]).getTime();
    const dateB = new Date(b["end"]).getTime();

    if (direction === 'up') return dateB - dateA; // Сравнение дат
    if (direction === 'down') return dateA - dateB;
    return 0 // Сравнение дат
  }
)

export const pagesSortFunc = (arr: Task[], direction: SortDirection) => [...arr].sort(
  (a, b) => {
    if (!a['pages'] || !b['pages']) {
      return 0
    }
    if (direction === 'up') return b['pages'] - a['pages']
    if (direction === 'down') return a['pages'] - b['pages']
    return 0
  }
)



