const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

import {dateDeadline} from './Calendar.js';
import CreateTask from './CreateTask.js';

import List from './List.js';

const list = new List();

function addTodo(event) {
    event.preventDefault();
    saveLocalStorage(todoInput.value);
    const task = new CreateTask(todoInput.value, dateDeadline, false, todoList);
    task.createNewTask();
    todoInput.value = '';
}

function showElement(condition, item) {
    if(condition) {
        item.style.display = 'flex';
    } else {
        item.style.display = 'none';
    }
}

function calculateDifferenceDays(dateDeadline) {
    let deadline = moment(dateDeadline, "MM-DD-YYYY").format("MM-DD-YYYY");
    let nowDate = moment().format("MM-DD-YYYY");
    return moment(deadline).diff(nowDate, 'days')
}

function filterTodo(event) {
    todoList.childNodes.forEach(function (item) {
        if (item.nodeName !== '#text') {
            switch (event.target.value) {
                case 'All': {
                    item.style.display = 'flex';
                    break;
                }
                case 'completed': {
                    showElement(item.classList.contains("completed"), item);
                    break;
                }
                case 'uncompleted': {
                    showElement(!item.classList.contains("completed"), item);
                    break;
                }
                case 'tomorrow': {
                    let isTomorrow = calculateDifferenceDays(item.children[1].innerHTML) === 1;
                    showElement(isTomorrow, item);
                    break;
                }
                case 'week': {
                    let isWeek = calculateDifferenceDays(item.children[1].innerHTML) < 7;
                    showElement(isWeek, item);
                    break;
                }
            }
        }
    })
}

function saveLocalStorage(todo) {
    list.saveLocalStorage(todo, dateDeadline);
}

function getTodos() {
    list.downloadExistTasks(todoList);
}

function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === 'trash-button') {
        list.removeLocalStorage(item);
    }
    if (item.classList[0] === 'complete-button') {
        list.updateCheckLocalStorage(item);
    }
}



