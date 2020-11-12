export default class CreateTask {

    constructor(text, dateDeadline, check, todoList) {
        this.text = text;
        this.dateDeadline = dateDeadline;
        this.check = check;
        this.todoList = todoList;
        this.todoDiv = document.createElement('div');
        this.todoDiv.classList.add("todo");
    }

    createLi() {
        const newTodo = document.createElement('li');
        newTodo.innerHTML = this.text;
        newTodo.classList.add("todo-item");
        this.todoDiv.appendChild(newTodo);
    }

    createDate() {
        const time = document.createElement('span');
        time.innerHTML = this.dateDeadline;
        time.classList.add("date-deadline");
        this.todoDiv.appendChild(time);
    }

    createCloseButton() {
        const completeButton = document.createElement('button');
        completeButton.innerHTML = 'done';
        completeButton.classList.add("complete-button");
        this.todoDiv.appendChild(completeButton);
    }

    createTrashButton() {
        const trashButton = document.createElement('button');
        trashButton.innerHTML = 'x';
        trashButton.classList.add("trash-button");
        this.todoDiv.appendChild(trashButton);
    }

    createNewTask() {
        this.createLi();
        if (this.dateDeadline !== null) {
            this.createDate();
        }
        this.createCloseButton();
        this.createTrashButton();
        this.todoList.appendChild(this.todoDiv);
    }

    createExistTask() {
        if (this.check) {
            this.todoDiv.classList.toggle("completed");
        }
        this.createLi();
        this.createDate();
        this.createCloseButton();
        this.createTrashButton();
        this.todoList.appendChild(this.todoDiv);
    }

}