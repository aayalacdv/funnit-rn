import { getStorageImageUrl } from './../../storage/storage_helper';
import { QueryDocumentSnapshot } from "firebase/firestore";
import { ActivityCategory } from "../types/types";

export const parseActivityCategory = async (doc: QueryDocumentSnapshot) => {
    const imageUrl = await getStorageImageUrl(doc.get('image'))
    const activityCategory: ActivityCategory = {
        id: doc.id,
        title: doc.get('title'),
        image: imageUrl,

    }

    return activityCategory
}
