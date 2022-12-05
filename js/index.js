'use strict'
import {count} from "./counter";
import createLi from "./todo-task/task";
import store from "./todo-store/store";

const selectAllButton = document.querySelector('.select-all-button');
const mainForm = document.querySelector('.main-form');
const todoList = document.querySelector('.todo-list');
const unselectedTasksCount = document.querySelector('.unselected-tasks-count');
const allTasksButton = document.getElementById('all-switcher');
const activeTasksButton = document.getElementById('active-switcher');
const completedTasksButton = document.getElementById('completed-switcher');
const clearButton = document.querySelector('.clear-button');

function addTask(e) {
    e.preventDefault();
    const currTask = {
        id: count(),
        description: e.target.querySelector('.main-input').value,
        isCompleted: false
    };
    store.add(currTask);

    this.reset();
    const task = createLi(currTask);
    todoList.append(task);
    showTasks();
}

function showTasks() {
    todoList.innerHTML = '';
    const tasks = store.getAll();
    tasks.forEach(task => {
        const taskLi = createLi(task);
        if (allTasksButton.checked) {
            todoList.append(taskLi);
        } else if (activeTasksButton.checked && !store.isCompleted(task)) {
            todoList.append(taskLi);
        } else if (completedTasksButton.checked && store.isCompleted(task)) {
            todoList.append(taskLi);
        }
    });
    refreshCount();
}

function refreshCount() {
    let counter = 0;
    todoList.childNodes.forEach(task => {
        if (!store.isCompleted(task)) {
            counter++;
        }
    })
    unselectedTasksCount.textContent = counter.toString() + ' items left';
}

function selectAll() {
    todoList.childNodes.forEach(task => {
        const checkbox = task.querySelector('.done-checkbox')
        if (!store.isCompleted(task)) {
            checkbox.checked = true;
            store.changeTask(task, checkbox.checked);
        }
    });
    showTasks();
}

function clearCompleted() {
    store.clearCompleted();
    showTasks();
}

function manipulateTask(e) {
    const target = e.target;
    const task = target.parentNode;
    const checkbox = task.querySelector('.done-checkbox');
    const description = task.querySelector('.task-text').value;
    if (target.className === 'delete-button') {
        task.remove();
        store.remove(task.id);
    } else if (target.className === 'done-checkbox') {
        store.changeTask(task, checkbox.checked);
    } else if (target.className === 'task-text') {
        store.changeTask(task, checkbox.checked, description);
        return;
    }
    showTasks();
}

allTasksButton.addEventListener('click', showTasks);
mainForm.addEventListener('submit', addTask);
todoList.addEventListener('click', manipulateTask);
todoList.addEventListener('input', manipulateTask);
activeTasksButton.addEventListener('click', showTasks);
completedTasksButton.addEventListener('click', showTasks);
selectAllButton.addEventListener('click', selectAll);
clearButton.addEventListener('click', clearCompleted);
