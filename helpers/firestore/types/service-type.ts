
export type FireStoreService<T> = {
    getAll : () => Promise<T[]>
    getOne: (id: string) => Promise<T | null>
    createOne: (T: T) => Promise<T | null>
    modifyOne: (id: string, T: T) => Promise<T>
    deleteOne: (id: string) => Promise<void>
    deleteMany: (ids: string[]) => Promise<void>
}




