export type Task = {
  id?: number
  name: string
  description: string
  categoryId: number | undefined
}

export type Category = {
  id?: number
  name: string
  description: string
}

export type TodoOrCategory = {
  id?: number
  name: string
  description: string
  categoryId?: number
}

export type MyIDBResponse = {
  ok: boolean
  request: IDBRequest
}
