import { Task, TaskApi } from "./TaskApi";
import { $form, $list, $newTaskInput, renderTasks } from "./elements";

const api = new TaskApi([
  { id: Task.uuid(), text: "Comprar leite", state: Task.state.PENDENT },
  { id: Task.uuid(), text: "Banho no cachorro", state: Task.state.PENDENT },
  { id: Task.uuid(), text: "Lavar a louça", state: Task.state.DONE },
  { id: Task.uuid(), text: "Fazer o almoço", state: Task.state.DONE },
  { id: Task.uuid(), text: "Lavar a roupa", state: Task.state.PENDENT },
]);

renderTasks(api);

$list.addEventListener("change", function (e) {
  if (!(e.target instanceof HTMLInputElement) || e.target.type !== "checkbox") {
    return;
  }

  const { value, checked } = e.target;

  if (value) {
    api.updateTaskState(value, checked ? Task.state.DONE : Task.state.PENDENT);
    renderTasks(api);
  }
});

$list.addEventListener("click", function (e) {
  if (!(e.target instanceof HTMLElement)) {
    return;
  }

  const id = e.target.getAttribute("data-delete-id");

  if (id) {
    api.deleteTask(id);
    renderTasks(api);
  }
});

$form.addEventListener("submit", function (e) {
  e.preventDefault();
  api.addTask($newTaskInput.value);
  renderTasks(api);
  $newTaskInput.value = "";
});
