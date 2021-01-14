export type Task = {
  id: string
  name: string
  description: string
  categoryId: string
}

export type Category = {
  id: string
  name: string
  description: string
}

export type TodoOrCategory = {
  id: string
  name: string
  description: string
  categoryId?: string
}
