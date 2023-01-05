import React, { useEffect, useState } from "react";
import { Box, ScrollView, Text } from "native-base";
import { ActivityItem } from "../helpers/firestore/types/types";
import { RefreshControl } from "react-native";
import * as Location from 'expo-location'
import { LatLng } from "react-native-maps";

type Props = {
    items: ActivityItem[]
}

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ListItem: React.FC<{ name: string, distance: number }> = ({ name, distance }) => {
    return (
        <Box bgColor={'red.400'} h={100} my={2} justifyItems='center' alignItems='center' flexDirection={'row'}>
            <Box bgColor="blue.100" h={'80%'} marginLeft={2} w={'1/5'} borderRadius={10} justifyContent='center' alignItems='center'>
                Imagen
            </Box>
            <Box w='full' h='80%' marginLeft={10} justifyItems='center'>
                <Text marginBottom={2} fontSize={'xl'} fontWeight='bold'>{name}</Text>
                <Text fontSize={'xl'} fontWeight='bold'>Distancia: {distance} Km</Text>
            </Box>
        </Box>
    )
}

const calculateDistanceInKm = (checkPoint: LatLng, centerPoint: LatLng) => {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
    var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    return Math.floor(Math.sqrt(dx * dx + dy * dy) * 10) / 10
}

const ActivityItemList: React.FC<Props> = ({ items }) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const [mapRegion, setmapRegion] = useState({
        latitude: 41.3825,
        longitude: 2.17694,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setmapRegion((prev: any) => {
                return {
                    ...prev,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
            })
        })();
    }, []);


    return (
        <ScrollView
            h='full'
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            bounces={true}
            bgColor={'blue.100'}>
            {
                items.map((activity: ActivityItem) =>
                    <ListItem
                        name={activity.title}
                        distance={calculateDistanceInKm(activity.coordinate,
                            { latitude: mapRegion.latitude, longitude: mapRegion.longitude },
                        )} />)
            }
        </ScrollView>
    )
}


export default ActivityItemList