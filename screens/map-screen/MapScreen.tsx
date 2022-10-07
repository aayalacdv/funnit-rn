import React, { useEffect, useState } from "react";
import { Text, View } from "native-base";
import * as Location from 'expo-location';
import MapView, {Marker} from "react-native-maps";



const MapScreen: React.FC<{ route: any }> = (props) => {
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
            console.log(location)
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
            >
                <Marker 
                    key="xdddd"
                    coordinate={{
                        latitude: 37.37790717796506,
                        longitude: -122.07685271787079,
                    }}
                    title='test'
                    description='test'
                    pinColor="red"
                />

            </MapView>

        </View>)
}


//37.39760965633324, -122.07640351651321


export default MapScreen