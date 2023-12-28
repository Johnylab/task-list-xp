import data from "../mock/data.js";
import { createTask } from "./components/task.js";

const ok = { status: "ok" };

const api = {
  data: [],

  respond(response, callback) {
    console.log("response", response);
    if (!(callback instanceof Function)) {
      return;
    }
    callback(response);
  },

  fetch(callback) {
    this.data = data;
    this.respond({ ...ok, data }, callback);
  },

  add(text, callback) {
    const task = createTask(text);
    this.data.push(task);
    this.respond({ ...ok, task }, callback);
  },

  update(task, callback) {
    const newData = this.data.map((item) => {
      if (item.id !== task.id) {
        return item;
      }
      return { ...item, ...task };
    });
    this.data = newData;
    this.respond(ok, callback);
  },

  delete(id, callback) {
    const newData = this.data.filter((item) => item.id !== id);
    this.data = newData;
    this.respond(ok, callback);
  },
};

export default api;
