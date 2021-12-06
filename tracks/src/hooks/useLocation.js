import React, { useEffect, useState } from 'react'

import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    Accuracy
} from 'expo-location'

export default (callback) => {
   
    const [err, setErr] = useState(null)

    const getLocation = async () => {
        try {
            const { granted } = await requestForegroundPermissionsAsync()
            if (!granted) {
                setErr('Permission to access location was denied')
            }
            await watchPositionAsync(
                // watchPosition tells us to keep watching/track of the position
                {
                    accuracy: Accuracy.BestForNavigation, // Accuracy.BestForNavigation is the best accuracy
                    timeInterval: 1000, // 1 second
                    distanceInterval: 10 // 10 meters
                },
                // (location) => { // location is the current position
                //     addLocation(location)
                callback
            )
        } catch (err) {
            setErr(err.message)
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    return  [err] 
}
