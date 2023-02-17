import { Box, Text } from 'native-base';
import React, { useEffect, useState } from 'react'; 
import * as Location from 'expo-location';
import { activityItemService } from '../../helpers/services/activityItem-service';
import ActivityItemList from '../../components/ActivityItemList';
import { ActivityItem } from '../../helpers/firestore/types/types';
import Banner from '../../components/Banner';


const ActivityItemListScreen : React.FC = (props : any) => {

    const [items, setItems] = useState<ActivityItem[]>([])
    const [errorMsg, setErrorMsg] = useState('')


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            const categoryId = props.route.params.id
            const service = activityItemService()
            const newItems = await service.findItemByCategory(categoryId)
            setItems(newItems)
        })();
    }, []);

    return (
        <Box>
            <Banner onPress={() => props.navigation.navigate('Options')}/>
            <ActivityItemList
              onClick={() => props.navigation.navigate('ActivityDetails')}
             items={items}/>
        </Box>
    )
}

export default ActivityItemListScreen; 
