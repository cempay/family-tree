import store from '../store'

export const createTodoItem = (entity) => {
  store.createTodoItem(entity)
  return {
    type: 'TODO_ITEM_ADDED'
  }
}

export const deleteTodoItem = (todoItem) => {
  store.deleteTodoItem(todoItem)
  return {
    type: 'TODO_ITEM_DELETED'
  }
}
