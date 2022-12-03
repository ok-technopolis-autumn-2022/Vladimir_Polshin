'use strict'
import createCheckbox from "./checkbox";
import createTextInput from "./textInput";
import createDeleteButton from "./deleteButton";

export default function createLi(task) {
    const li = document.createElement('li');
    li.className = 'todo-task';
    li.id = task.id;

    const checkbox = createCheckbox(li.id, task);
    const textInput = createTextInput(li.id, task);
    const deleteButton = createDeleteButton(li.id);

    li.append(checkbox, textInput, deleteButton);
    return li;
}
