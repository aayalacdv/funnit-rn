import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();


export const getStorageImageUrl  = async (url: string) : Promise<string> => {
    const vrRef = ref(storage, url);
    const imageUrl = await getDownloadURL(vrRef)
        .then((url) => url)
        .catch(error => '')

    return imageUrl
} 