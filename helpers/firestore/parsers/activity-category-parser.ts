import { QueryDocumentSnapshot } from "firebase/firestore";
import { ActivityCategory } from "../types/types";

export const parseActivityCategory = (doc: QueryDocumentSnapshot) => {
    const activityCategory: ActivityCategory = {
        id: doc.id,
        title: doc.get('title'),
        image: doc.get('image'),
    }
    console.log(doc.get('coordinate'))

    return activityCategory
}
