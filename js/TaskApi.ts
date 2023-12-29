import { v4 as uuid } from "uuid";

type TaskStateMap = {
  PENDENT: string;
  DONE: string;
};

type TaskStateValue = TaskStateMap[keyof TaskStateMap];

class Task {
  id: string;
  text: string;
  state: TaskStateValue;

  static uuid = uuid;

  static state: TaskStateMap = { PENDENT: "PENDENT", DONE: "DONE" } as const;
}

class TaskApi {
  #data: Task[];

  constructor(initialData: Task[] = []) {
    this.#data = initialData;
  }

  addTask(text: string): Task {
    const newTask = {
      id: uuid(),
      text,
      state: Task.state.PENDENT,
    };
    this.#data.push(newTask);
    return newTask;
  }

  updateTaskState(id: string, newState: TaskStateValue) {
    const task = this.#data.find(({ id: taskId }) => taskId === id);
    if (task) {
      task.state = newState;
    }
  }

  deleteTask(id: string) {
    this.#data = this.#data.filter(({ id: taskId }) => taskId !== id);
  }

  getAll(): Task[] {
    return this.#data;
  }
}

export type { TaskStateMap, TaskStateValue };

export { Task, TaskApi };
