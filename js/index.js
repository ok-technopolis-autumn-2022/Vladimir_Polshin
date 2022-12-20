'use strict'
import {count} from "./counter";
import createLi from "./todo-task/task";
import store from "./todo-store/store";
import events from "./todo-store/events";

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
}

function changeTask(e) {
    const target = e.target;
    const task = target.parentNode;
    const checkbox = task.querySelector('.done-checkbox');
    const description = task.querySelector('.task-text').value;
    switch (target.className) {
        case 'done-checkbox':
            store.change(task, checkbox.checked);
            break;
        case 'task-text':
            store.change(task, checkbox.checked, description);
            break;
        case 'delete-button':
            store.remove(task.id);
    }
}

function selectAllTasks() {
    store.selectAll();
}

function clearCompletedTasks() {
    store.removeCompleted();
}

function rerenderTasks() {
    todoList.innerHTML = '';
    const tasks = store.getAll();
    tasks.forEach(task => {
        const taskLi = createLi(task);
        if (allTasksButton.checked || activeTasksButton.checked && !store.isCompleted(task)
            || completedTasksButton.checked && store.isCompleted(task)) {
            todoList.append(taskLi);
        }
    });
}

function refreshCounter() {
    let counter = 0;
    store.getAll().forEach(task => {
        if (!store.isCompleted(task)) {
            counter++;
        }
    });
    unselectedTasksCount.textContent = counter.toString() + ' items left';
}

allTasksButton.addEventListener('click', rerenderTasks);
mainForm.addEventListener('submit', addTask);
todoList.addEventListener('click', changeTask);
todoList.addEventListener('input', changeTask);
activeTasksButton.addEventListener('click', rerenderTasks);
completedTasksButton.addEventListener('click', rerenderTasks);
selectAllButton.addEventListener('click', selectAllTasks);
clearButton.addEventListener('click', clearCompletedTasks);

store.subscribe((event) => {
    switch (event) {
        case events.TASK_ADDED:
            document.querySelector('.main-input').value = '';
        case events.TASK_REMOVED:
        case events.TASK_CHANGED:
            rerenderTasks();
        case events.REFRESHED_COUNTER:
            refreshCounter();
    }
});
