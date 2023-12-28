import api from "./api.js";
import renderTask from "./components/task.js";
import { form, list, newTaskInput } from "./constants/elements.js";
import { DONE, PENDENT } from "./constants/task-states.js";

api.fetch((resp) => {
  list.innerHTML = resp.data.map(renderTask).join("");
});

list.addEventListener("change", function (e) {
  const { value, checked } = e.target;
  if (!value) {
    return;
  }

  const state = checked ? DONE : PENDENT;
  const task = api.data.find(({ id }) => id === value);
  api.update({ ...task, state });
});

list.addEventListener("click", function (e) {
  const id = e.target.getAttribute("data-delete-id");
  if (!id) {
    return;
  }
  api.delete(id, () => {
    const element = list.querySelector(`#${id}`);
    if (element && element.parentElement) {
      element.parentElement.removeChild(element);
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  api.add(newTaskInput.value, (resp) => {
    list.innerHTML += renderTask(resp.task);
    newTaskInput.value = "";
  });
});
