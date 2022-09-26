import { useQuery } from "react-query"
import { firestore } from "../firebase/config"
import { fireStoreService } from "../helpers/firestore/firestore.service"
import { parseActivityCategory } from "../helpers/firestore/parsers/activity-category-parser"
import { ActivityCategory } from "../helpers/firestore/types/types"
import { getStorageImageUrl } from "../helpers/storage/storage_helper"

const activityService = fireStoreService<ActivityCategory>('ActivityCategory', firestore, parseActivityCategory)

const getFullActivities = async (activities: ActivityCategory[]) => {
    const fullActivities = []
    for (let i = 0; i < activities.length; ++i) {
        let newActivity = activities[i]
        newActivity.image = await getStorageImageUrl(activities[i].image)
        fullActivities.push(newActivity)
    }
    return fullActivities
}

export const useActivities = () => {

    const { data: rawActivities } = useQuery('rawActivities', activityService.getAll)
    const { data, isLoading, isError } = useQuery('activities', () => getFullActivities(rawActivities as any), {
        enabled: rawActivities?.length! > 0
    })


    return { data, isLoading, isError }
}

