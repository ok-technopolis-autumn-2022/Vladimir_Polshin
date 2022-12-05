'use strict'
import store from "../todo-store/store";

export default function createCheckbox(id, task) {
    const checkbox = document.createElement('input');
    checkbox.className = 'done-checkbox';
    checkbox.type = 'checkbox';
    checkbox.ariaLabel = 'Complete the task';
    checkbox.id = id;
    checkbox.checked = store.isCompleted(task);
    return checkbox;
}
