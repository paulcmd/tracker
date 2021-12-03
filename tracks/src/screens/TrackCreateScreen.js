import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    Accuracy
} from 'expo-location'
import { Text } from 'react-native-elements'
import { Context as LocationContext } from '../context/LocationContext'
import Map from '../components/Map'
import '../_mockLocation'

const TrackCreateScreen = () => {
    const [err, setErr] = useState(null)
    const { addLocation } = useContext(LocationContext)
    const startWatching = async () => {
        try {
            const { granted } = await requestForegroundPermissionsAsync()
            console.log('granted : ', granted)
            if (!granted) {
                setErr('Permission to access location was denied')
                return
            } else {
                await watchPositionAsync(
                    {
                        // watchPosition tells us to keep watching/track of the position
                        accuracy: Accuracy.BestForNavigation, // the most accurate
                        timeInterval: 1000, // every second
                        distanceInterval: 10 // every 10 meters
                    },
                    (location) => {
                        addLocation(location)
                    }
                )
                // console.log('watchPosition : ', watchPosition)
            }
        } catch (e) {
            setErr(e)
        }
    }

    useEffect(() => {
        startWatching()
    }, [])
    return (
        <SafeAreaView>
            <Text h2>Creat a Track!</Text>
            <Map />
            {err ? <Text>{err}</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default TrackCreateScreen
