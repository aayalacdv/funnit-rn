import { parseActivityItem } from './../firestore/parsers/acitivity-item-parser';
import { firestore } from "../../firebase/config";
import { fireStoreService } from "../firestore/firestore.service";
import { ActivityItem } from "../firestore/types/types";


type ActivityItemServiceType = {
    findItemByCategory: (categoryId: string) => Promise<ActivityItem[]>,
    findAll: () => Promise<ActivityItem[]>,

}

export const  activityItemService = () : ActivityItemServiceType => {

    const service = fireStoreService<ActivityItem>('ActivityItem', firestore, parseActivityItem)

    const findItemByCategory = async (categoryId: string): Promise<ActivityItem[]> => {
        const items = await service.getAll()
        const filtered = items.filter(item => item.categories.includes(categoryId))
        return filtered
    }

    const findAll = (): Promise<ActivityItem[]> => service.getAll()

    return {
        findItemByCategory,
        findAll
    }
}




