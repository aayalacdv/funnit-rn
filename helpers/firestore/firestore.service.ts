import { FireStoreService } from "./types/service-type";
import { addDoc, collection, deleteDoc, doc, Firestore, FirestoreError, getDocs, QueryDocumentSnapshot, QuerySnapshot, setDoc } from "firebase/firestore";
import { Todo } from "./types/types";

const parseTodo = (doc: QueryDocumentSnapshot): Todo => {
    const todo: Todo = {
        id: doc.id,
        action: doc.get('action'),
        done: doc.get('done')
    }

    return todo
}

export const fireStoreService = (collectionName: string, firestore: Firestore): FireStoreService => {

    const getAll = async (): Promise<Todo[]> => {
        const todos: Todo[] = []
        const querySnapshot = await getDocs(collection(firestore, collectionName))
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            todos.push(parseTodo(doc))
        })
        return todos
    }


    const getOne = async (id: string): Promise<Todo | undefined> => {
        let document
        try {
        const querySnapshot = await getDocs(collection(firestore, collectionName))
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            if(doc.id === id){
                document =  parseTodo(doc)
            }
        })
        return document
        } catch (error) {
            console.log('error', error)
            return document
        }
    }

    const createOne = async (todo: Todo): Promise<Todo | undefined> => {
        const docRef = await addDoc(collection(firestore, collectionName), todo)
        return {
            id: docRef.id,
            ...todo
        }
    }


    const modifyOne = async (id: string, todo: Todo): Promise<Todo> => {
        await setDoc(doc(firestore, collectionName, id), todo)
        return {
            id: id,
            ...todo
        }
    }

    const deleteOne = async (id: string): Promise<void> => await deleteDoc(doc(firestore, collectionName, id))

    const deleteMany = async (ids: string[]): Promise<void> => {
        for (let i = 0; i < ids.length; ++i) {
            await deleteDoc(doc(firestore, collectionName, ids[i]))
        }
    }

    return {
        getAll,
        getOne,
        createOne,
        modifyOne,
        deleteOne,
        deleteMany
    }
}
