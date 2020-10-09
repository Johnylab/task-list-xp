import api from './api'
import renderTask from './components/task'
import { form, list, newTaskInput } from './constants/elements'
import { DONE, PENDENT } from './constants/task-states'

api.fetch((resp) => {
  list.innerHTML = resp.data.map(renderTask).join('')
})

list.addEventListener('change', function (e) {
  const { value, checked } = e.target
  if (!value) {
    return
  }

  const state = checked ? DONE : PENDENT
  const task = api.data.find(({ id }) => id === value)
  api.update({ ...task, state })
})

list.addEventListener('click', function (e) {
  const id = e.target.getAttribute('data-delete-id')
  if (!id) {
    return
  }
  api.delete(id, (resp) => {
    const element = list.querySelector(`#${id}`)
    if (element && element.parentElement) {
      element.parentElement.removeChild(element)
    }
  })
})

form.addEventListener('submit', function (e) {
  e.preventDefault()
  api.add(newTaskInput.value, (resp) => {
    list.innerHTML += renderTask(resp.task)
    newTaskInput.value = ''
  })
})
