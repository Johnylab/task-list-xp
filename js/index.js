import { v4 as uuid } from "uuid";

const $container = document.querySelector("#app");
const $list = $container.querySelector("#app .app-list");
const $form = $container.querySelector("#app .app-form");
const $newTaskInput = $form.querySelector("#new-task");

const taskStates = { PENDENT: "PENDENT", DONE: "DONE" };

let data = [
  { id: uuid(), text: "Comprar leite", state: taskStates.PENDENT },
  { id: uuid(), text: "Banho no cachorro", state: taskStates.PENDENT },
  { id: uuid(), text: "Lavar a louça", state: taskStates.DONE },
];

const renderTask = ({ id, text, state }) => /* html */ `
<div class="task-item" data-id="${id}">
  <label>
    <input
      class="task__checkbox"
      type="checkbox"
      ${state === taskStates.DONE ? "checked" : ""}
      value="${id}"
    />
    <span class="task__checkbox-placeholder"></span>
    <span class="task__text">${text}</span>
  </label>
  <button
    class="task__delete-button"
    data-delete-id="${id}"
  >
    <img src="./img/delete-button.svg" width="16" height="16">
  </button>
</div>
`;

const createTask = (text) => ({
  id: uuid(),
  text,
  state: taskStates.PENDENT,
});

const updateTaskState = (id, newState) => {
  const task = data.find(({ id: taskId }) => taskId === id);
  if (task) {
    task.state = newState;
  }
};

const deleteTask = (id) => {
  data = data.filter(({ id: taskId }) => taskId !== id);
};

const renderTasks = () => {
  $list.innerHTML = data.map(renderTask).join("");
};

renderTasks();

$list.addEventListener("change", function (e) {
  const { value, checked } = e.target;
  if (value) {
    updateTaskState(value, checked ? taskStates.DONE : taskStates.PENDENT);
    renderTasks();
  }
});

$list.addEventListener("click", function (e) {
  const id = e.target.getAttribute("data-delete-id");
  if (id) {
    deleteTask(id);
    const element = $list.querySelector(`[data-id="${id}"]`);
    element?.remove();
  }
});

$form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTask = createTask($newTaskInput.value);
  data.push(newTask);
  renderTasks();
  $newTaskInput.value = "";
});
