'use strict'

class Store {
    _tasks = [];

    constructor(tasks) {
        if (Array.isArray(tasks)) {
            this._tasks = this._tasks.concat(tasks);
        }
    }

    add(task) {
        this._tasks.push(task);
    }

    getAll() {
        return this._tasks;
    }

    remove(id) {
        this._tasks = this._tasks.filter(task => task.id !== Number(id))
    }

    changeTask(task, isCompleted, description) {
        const currTask = this.#getById(task.id);
        if (!currTask) {
            return;
        }

        currTask.isCompleted = isCompleted;
        if (description) {
            currTask.description = description;
        }
    }

    clearCompleted() {
        this._tasks = this._tasks.filter((task) => !task.isCompleted);
    }

    isCompleted(task) {
        const currTask = this.#getById(task.id);
        if (currTask) {
            return currTask.isCompleted;
        }
    }

    #getById(id) {
        return this._tasks.find(task => task.id === Number(id));
    }
}

const store = new Store();
export default store;
