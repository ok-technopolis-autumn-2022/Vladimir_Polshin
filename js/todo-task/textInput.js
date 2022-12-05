'use strict'
export default function createTextInput(id, task) {
    const textInput = document.createElement('input');
    textInput.className = 'task-text';
    textInput.type = 'text';
    textInput.ariaLabel = 'Edit the task';
    textInput.value = task.description;
    textInput.id = id;
    return textInput;
}
