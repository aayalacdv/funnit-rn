import { QueryDocumentSnapshot } from "firebase/firestore";
import { ActivityItem } from "../types/types";

export const parseActivityItem = (doc: QueryDocumentSnapshot) => {
    const activityItem: ActivityItem= {
        id: doc.id,
        imageUrl: doc.get('imageUrl'),
        title: doc.get('title'),
        description: doc.get('description'), 
        categories: doc.get('category'),
        coordinate: {
            latitude: doc.get('coordinate').latitude,
            longitude: doc.get('coordinate').longitude 
        }
    }

    return activityItem
}
