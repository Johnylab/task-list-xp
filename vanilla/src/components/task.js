import { DONE, PENDENT } from '../constants/task-states'
import { token } from '../mock/token'
import svg from '../img/delete-button.svg'

const renderTask = ({ id, text, state }) => /* html */`
<div class="task ${state === DONE ? 'task--done' : ''}" id="${id}">
  <label>
    <input
      class="task__checkbox"
      type="checkbox"
      ${state === DONE ? 'checked' : ''}
      value="${id}"
    />
    <span class="task__checkbox-placeholder"></span>
    <span class="task__text">${text}</span>
  </label>
  <button
    class="task__delete-button"
    data-delete-id="${id}"
  >
    <img src="${svg}" width="30" height="16">
  </button>
</div>
`

export const createTask = text => ({ id: token(), text, state: PENDENT })

export default renderTask
