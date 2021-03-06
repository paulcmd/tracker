import React, { useContext } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Polyline, Circle } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'

const Map = () => {
    const {
        state: { currentLocation, locations }
    } = useContext(LocationContext)

    //console.log(locations)

    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
    }
    return (
        <View style={styles.container}>
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
                <Polyline
                    coordinates={locations.map((loc) => {
                        // console.log(loc.coords.latitude)
                        return {
                            latitude: loc?.coords.latitude,
                            longitude: loc?.coords.longitude
                        }
                    })}
                    strokeColor="black"
                    strokeWidth={3}
                    lineDashPattern={[1]}
                />
            </MapView>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        height: 315,
        borderColor: 'black',
        borderWidth: 0.5,
        margin: 5
    },
    map: {
        ...StyleSheet.absoluteFillObject
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
