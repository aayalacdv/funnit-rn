import React, { useEffect, useState } from "react";
import { Text, View } from "native-base";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { activityItemService } from "../../helpers/services/activityItem-service";
import { ActivityItem } from "../../helpers/firestore/types/types";


const MapScreen: React.FC<{ route: any }> = (props) => {
    const [markers, setMarkers] = useState<ActivityItem[]>([]);
    const [location, setLocation] = useState<any>();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [mapRegion, setmapRegion] = useState({
        latitude: 41.3825,
        longitude: 2.17694,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

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
            const items = await service.findItemByCategory(categoryId)
            setMarkers(items)


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
        <View >
            <MapView
                ref={MapView => (MapView = MapView)}
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
                showsUserLocation={true}
                minZoomLevel={15}
            >
                {
                    markers.map((marker, index) => {
                        return <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.coordinate.latitude,
                                longitude: marker.coordinate.longitude,
                            }}
                            title={marker.title}
                            description={marker.description}
                            pinColor="red"
                        />
                    })

                }

            </MapView>

        </View>)
}


export default MapScreen