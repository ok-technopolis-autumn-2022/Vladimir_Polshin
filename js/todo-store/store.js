'use strict'
import events from "./events";

class Store {
    #tasks = [];
    #observers = [];

    constructor(tasks) {
        if (Array.isArray(tasks)) {
            this.#tasks = this.#tasks.concat(tasks);
        }
    }

    subscribe(observer) {
        this.#observers.push(observer);
        observer(this);
    }

    notify(event) {
        this.#observers.forEach(currObserver => currObserver(event));
    }

    add(task) {
        this.#tasks.push(task);
        this.notify(events.TASK_ADDED);
    }

    change(task, isCompleted, description) {
        const currTask = this.#getById(task.id);
        if (!currTask) {
            return;
        }

        currTask.isCompleted = isCompleted;
        if (!description) {
            this.notify(events.TASK_CHANGED);
            return;
        }
        currTask.description = description;
        this.notify(events.REFRESHED_COUNTER);
    }

    remove(id) {
        this.#tasks = this.#tasks.filter(task => task.id !== Number(id));
        this.notify(events.TASK_REMOVED);
    }

    removeCompleted() {
        this.#tasks = this.#tasks.filter((task) => !task.isCompleted);
        this.notify(events.TASK_REMOVED);
    }

    isCompleted(task) {
        const currTask = this.#getById(task.id);
        if (currTask) {
            return currTask.isCompleted;
        }
    }

    selectAll() {
        this.#tasks.forEach(task => task.isCompleted = true);
        this.notify(events.TASK_CHANGED);
    }

    getAll() {
        return this.#tasks;
    }

    #getById(id) {
        return this.#tasks.find(task => task.id === Number(id));
    }
}

const store = new Store();
export default store;
