'use strict'
export default function createDeleteButton(id) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.title = 'Delete the task';
    deleteButton.id = id;
    return deleteButton;
}
