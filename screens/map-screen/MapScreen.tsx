import React, { useEffect, useState } from "react";
import { Center, Slider, Text, View } from "native-base";
import * as Location from 'expo-location';
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import { activityItemService } from "../../helpers/services/activityItem-service";
import { ActivityItem } from "../../helpers/firestore/types/types";
/*
  red,
    tomato,
     orange,
      yellow, 
      green,
    gold,
     wheat, 
     linen, 
     tan,
      blue,
       aqua,
        teal,
         violet,
          purple,
           indigo,
            turquoise,
             navy 
  plum.  
 */

const arePointsNear = (checkPoint: LatLng, centerPoint: LatLng, radius: number)  => {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
    var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= (radius / 1000);
}

const getColorFromCategoryId = (id: string) => {
    switch(id){
        case "RGtbFHHvFtI3dGy0IH22": 
            return "indigo"
        
    }

} 

const MapScreen: React.FC<{ route: any }> = (props) => {
    const [markers, setMarkers] = useState<ActivityItem[]>([])
    const [radius, setRadius] = useState<number>(0)
    const [errorMsg, setErrorMsg] = useState<string>('')
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
        <View
            alignItems={'center'}
            height={'full'}>
            <Center
                style={{ height: '50%', width: '80%' }}
                marginY={10}
                borderColor='gray.400'
                borderRadius={20}
                borderWidth={10}
                alignItems='center'
                justifyContent='center'
                overflow={'hidden'}
            >
                <MapView

                    ref={MapView => (MapView = MapView)}
                    region={mapRegion}
                    style={{ height: '100%', width: '100%' }}
                    showsUserLocation={true}
                    minZoomLevel={15}
                >
                    <Circle
                        center={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
                        fillColor='rgba(250,0,0,0.5)'
                        strokeColor="rgba(250,0,0,0.5)"
                        radius={radius}
                    />



                    {
                        markers
                            // .filter((marker) =>
                            //     arePointsNear(
                            //         marker.coordinate,
                            //         { latitude: mapRegion.latitude, longitude: mapRegion.longitude },
                            //         radius))
                            .map((marker, index) => {
                                return <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: marker.coordinate.latitude,
                                        longitude: marker.coordinate.longitude,
                                    }}
                                    title={marker.title}
                                    description={marker.description}
                                    pinColor={getColorFromCategoryId(marker.categories[0])}
                                />
                            })

                    }
                </MapView>
            </Center>

            <Text>Distancia {radius/1000} Km</Text>
            <Slider
                onChange={(value) => setRadius(value)}
                defaultValue={0}
                value={radius}
                maxValue={500}
                colorScheme="red"
                width={'70%'}>
                <Slider.Track>
                    <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
            </Slider>


        </View>)
}


export default MapScreen