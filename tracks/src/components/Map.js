import React from 'react'
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
import MapView from 'react-native-maps'

const Map = () => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                longitude: -122.4324,
                latitude: 37.78825,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
                showsUserLocation: true,
                showsMyLocationButton: true,
                showsCompass: true,
                showsScale: true,
                showsBuildings: true,
                showsTraffic: true,
            }}
        />
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        height: 500
    }
})

/* 
A MapView is like an image div, you have to set height and width to be able to see it.
*/
