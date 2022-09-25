import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { preventAutoHideAsync } from "expo-splash-screen";



const Minimap = () => {

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
        setmapRegion((prev : any) => {

            return {
                ...prev, 
                latitude: location.coords.latitude, 
                longitude: location.coords.longitude
            }
        })
      })();
    }, []);




      return (
        <View style={styles.container}>
          <MapView
            style={{ alignSelf: 'stretch', height: '100%' }}
            region={mapRegion}
          />
        </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });





export default Minimap