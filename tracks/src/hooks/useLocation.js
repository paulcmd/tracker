import React, { useEffect, useState } from 'react'

import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    Accuracy
} from 'expo-location'

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null)
    const [subscriber, setSubscriber] = useState(null)

    const watchLocation = async () => {
        try {
            const { granted } = await requestForegroundPermissionsAsync()
            if (!granted) {
                setErr('Permission to access location was denied')
            }
            const sub = await watchPositionAsync(
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
            setSubscriber(sub)
        } catch (err) {
            setErr(err.message)
        }
    }

    useEffect(() => {
        if (shouldTrack) {  //if isFocused is true
            watchLocation()
        } else {
            subscriber && subscriber.remove()
        }
    }, [shouldTrack]) // if shouldTrack changes, run watchLocation

    return [err]
}
