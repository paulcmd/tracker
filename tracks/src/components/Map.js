import React, { useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native'
import MapView, { Polygon, Circle } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'

const Map = () => {
    const {
        state: { currentLocation }
    } = useContext(LocationContext)
    //console.log(currentLocation)

    
    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
    }
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords, // latitude and longitude will be pulled from currentLocation.coords
                longitudeDelta: 0.01,
                latitudeDelta: 0.01
            }}
        >
            <Circle
                center={currentLocation.coords}
                radius={30}
                strokeColor="rgba(158, 158, 255, 1.0)"
                fillColor="rgba(158, 158, 255, 0.3)"
            />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        height: 450
    }
})

/* 
my current location:
longitude: -110.9127912,
latitude: 32.1504694,

A MapView is like an image div, you have to set height and width to be able to see it.

replaced polyline with polygon. polyline is giving an error in current version of map

initialRegion is the center of the map. what gets rendered when the map loads. delta is how zoomed in or out

circle will get longitude and latitude off of currentLocation.coords radius is in meters

region is the current location of the user. ie where we have moved to.
creating random points
const points = []
    for (let i = 0; i < 20; i++) {
        if (i % 2 == 0) {
            const latitude = 37.33233 + i * 0.001
            const longitude = -122.03121 + i * 0.001

            points.push({
                longitude: parseFloat(longitude.toFixed(6)), //tofixed is used to fix the decimal places. it gives back a string, so we need to parse it to float(numbers)
                latitude: parseFloat(latitude.toFixed(6))
            })
        } else {
            const latitude = 37.33233 - i * 0.002
            const longitude = -122.03121 + i * 0.001

            points.push({
                longitude: parseFloat(longitude.toFixed(6)), //tofixed is used to fix the decimal places. it gives back a string, so we need to parse it to float(numbers)
                latitude: parseFloat(latitude.toFixed(6))
            })
        }
    }
*/
