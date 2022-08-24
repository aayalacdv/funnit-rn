import { Todo } from "./types"

export type FireStoreService = {
    getAll : () => Promise<Todo[]>
    getOne: (id: string) => Promise<Todo | undefined>
    createOne: (todo: Todo) => Promise<Todo | undefined>
    modifyOne: (id: string, todo: Todo) => Promise<Todo>
    deleteOne: (id: string) => Promise<void>
    deleteMany: (ids: string[]) => Promise<void>
}




