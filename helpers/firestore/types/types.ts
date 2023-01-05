type ActivityCategory = {
    id?: string, 
    title: string, 
    image: string,
}

type ActivityItem = {
    id?: string, 
    imageUrl: string,
    title: string,
    description: string,
    categories: string[],
    coordinate: {
        latitude: number, 
        longitude: number,
    } 
}


export { ActivityCategory, ActivityItem }
