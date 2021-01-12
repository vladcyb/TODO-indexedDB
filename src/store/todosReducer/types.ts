export type Todo = {
  id: string
  name: string
  description: string
  categoryId: string
}

export type AddTodoPayloadType = {
  todo: Todo
}
