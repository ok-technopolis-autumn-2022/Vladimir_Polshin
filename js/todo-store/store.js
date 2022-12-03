'use strict'

class Store {
    _tasks = [];

    constructor(tasks) {
        if (tasks) {
            for (const task of tasks) {
                this._tasks.push(task);
            }
        }
    }

    add(task) {
        this._tasks.push(task);
    }

    getAll() {
        return this._tasks;
    }

    remove(id) {
        this._tasks = this._tasks.filter(task => task.id !== parseInt(id))
    }

    changeTask(task, isCompleted, description = "") {
        const currTask = this.#getById(task.id);
        if (currTask.id !== -1) {
            currTask.isCompleted = isCompleted;
            currTask.description = description;
        }
    }

    clearCompleted() {
        this._tasks = this._tasks.filter((task) => !task.isCompleted);
    }

    isCompleted(task) {
        const currTask = this.#getById(task.id);
        if (currTask.id !== -1) {
            return currTask.isCompleted;
        }
    }

    #getById(id) {
        return this._tasks.find(task => task.id === parseInt(id));
    }
}

const store = new Store();
export default store;
