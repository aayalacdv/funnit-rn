import { FireStoreService } from "./types/service-type";
import { addDoc, collection, deleteDoc, doc, Firestore, FirestoreError, getDocs, QueryDocumentSnapshot, QuerySnapshot, setDoc } from "firebase/firestore";



export const fireStoreService = <T>(collectionName: string, firestore: Firestore, parsingFunction: (doc: QueryDocumentSnapshot) => T): FireStoreService<T> => {

    const getAll = async (): Promise<T[]> => {
        const all: T[] = []
        const querySnapshot = await getDocs(collection(firestore, collectionName))
        querySnapshot.forEach(async (doc: QueryDocumentSnapshot) => {
            all.push(await parsingFunction(doc) )
        })
        return all 
    }


    const getOne = async (id: string): Promise< T | null> => {
        let document : any
        try {
            const querySnapshot = await getDocs(collection(firestore, collectionName))
            querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
                if (doc.id === id) {
                    let document = parsingFunction(doc)
                }
            })
            return document
        } catch (error) {
            console.log('error', error)
            return null 
        }
    }

    const createOne = async (newDoc : T): Promise< T | null> => {
        const docRef = await addDoc(collection(firestore, collectionName), newDoc as any)
        return {
            id: docRef.id,
            ...newDoc
        }
    }


    const modifyOne = async (id: string, newDoc: T): Promise<T> => {
        await setDoc(doc(firestore, collectionName, id), newDoc as any)
        return {
            id: id,
            ...newDoc
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
