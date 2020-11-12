import CreateTask from './CreateTask.js';

export default class List {
    todos = [];
    dateDeadlineArr = [];
    checkedTasks = [];

    constructor() {
        if (localStorage.getItem('todos') === null) {
            this.todos = [];
            this.dateDeadlineArr = [];
            this.checkedTasks = [];
        } else {
            this.todos = JSON.parse(localStorage.getItem('todos')).todos;
            this.dateDeadlineArr = JSON.parse(localStorage.getItem('todos')).deadline;
            this.checkedTasks = JSON.parse(localStorage.getItem('todos')).checked;
        }
    }

    downloadExistTasks(todoList) {
        this.todos.forEach((el, index) => {
            const task = new CreateTask(el, this.dateDeadlineArr[index], this.checkedTasks[index], todoList);
            task.createExistTask();
        })
    }

    saveLocalStorage(task, dateDeadline) {
        this.todos.push(task);
        this.dateDeadlineArr.push(dateDeadline);
        this.checkedTasks.push(false);
        localStorage.setItem('todos', JSON.stringify({
            todos: this.todos,
            deadline: this.dateDeadlineArr,
            checked: this.checkedTasks,
        }));
    }

    removeLocalStorage(todo) {
        todo.parentElement.remove();
        let text = todo.parentElement.children[0].innerHTML;
        let index = this.todos.indexOf(text);
        this.todos.splice(index, 1);
        this.dateDeadlineArr.splice(index, 1);
        this.checkedTasks.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify({
            todos: this.todos,
            deadline: this.dateDeadlineArr,
            checked: this.checkedTasks,
        }));
    }

    updateCheckLocalStorage(todo) {
        let text = todo.parentElement.children[0].innerHTML;
        let index = this.todos.indexOf(text);
        todo.parentElement.classList.toggle("completed");
        this.checkedTasks[index] = !this.checkedTasks[index];
        localStorage.setItem('todos', JSON.stringify({
            todos: this.todos,
            deadline: this.dateDeadlineArr,
            checked: this.checkedTasks,
        }));
    }


}