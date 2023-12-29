import { Task, TaskApi } from "./TaskApi";

const $container = document.querySelector("#app") as HTMLElement;
if (!$container) {
  throw new Error("App container not found");
}

const $form = $container.querySelector("#app .app-form") as HTMLFormElement;
if (!$form) {
  throw new Error("Form not found");
}

const $list = $container.querySelector("#app .app-list") as HTMLElement;
if (!$list) {
  throw new Error("List element not found");
}

const $newTaskInput = $form.querySelector("#new-task") as HTMLInputElement;
if (!$newTaskInput) {
  throw new Error("New task input element not found");
}

const checkedSvg = /* html */ `
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 32 32">
  <path d="M28.998 8.531l-2.134-2.134c-0.394-0.393-1.030-0.393-1.423 0l-12.795 12.795-6.086-6.13c-0.393-0.393-1.029-0.393-1.423 0l-2.134 2.134c-0.393 0.394-0.393 1.030 0 1.423l8.924 8.984c0.393 0.393 1.030 0.393 1.423 0l15.648-15.649c0.393-0.392 0.393-1.030 0-1.423z"/>
</svg>
`;

const renderTask = ({ id, text, state }: Task) => /* html */ `
<div class="task-item ${state.toLowerCase()}" data-id="${id}">
  <label>
    <input
      class="task__checkbox"
      type="checkbox"
      ${state === Task.state.DONE ? "checked" : ""}
      value="${id}"
    />
    <span class="task__checkbox-placeholder">${
      state === Task.state.DONE ? checkedSvg : ""
    }</span>
    <span class="task__text">${text}</span>
  </label>
  <button
    class="task__delete-button"
    data-delete-id="${id}"
  >
    <svg viewBox="0 0 20 20" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m9 0c-1.645 0-3 1.355-3 3v1h-4a1 1 0 0 0-1 1 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1 1 1 0 0 0-1-1h-4v-1c0-1.645-1.355-3-3-3zm0 2h2c0.56413 0 1 0.43587 1 1v1h-4v-1c0-0.56413 0.43587-1 1-1zm-5 5a1 1 0 0 0-1 1v8c0 2.1973 1.8027 4 4 4h6c2.1973 0 4-1.8027 4-4v-8a1 1 0 0 0-1-1 1 1 0 0 0-1 1v8c0 1.1164-0.88359 2-2 2h-6c-1.1164 0-2-0.88359-2-2v-8a1 1 0 0 0-1-1zm4 2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z" />
    </svg>
  </button>
</div>
`;

const renderTasks = (api: TaskApi) => {
  const data = api.getAll();
  $list.innerHTML = data.map(renderTask).join("");
};

export { $container, $form, $list, $newTaskInput, renderTasks };
