import { useEffect, useState } from 'react'

import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    Accuracy
} from 'expo-location'

export default (shouldTrack, callback) => {
    // shouldTrack is isFocused from TrackCreate, callback is addLocation
    const [err, setErr] = useState(null)

    useEffect(() => {
        let subscriber   //setting subscriber to useState is unnecessary because we arent using it to render anything. this is more efficient
        const watchLocation = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync()
                if (!granted) {
                    setErr('Permission to access location was denied')
                }
                subscriber = await watchPositionAsync(
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
        if (shouldTrack) {
            //if isFocused is true
            watchLocation()
        } else {
            subscriber && subscriber.remove()
            subscriber = null //sub has been removed, so we set subscriber state to null
        }
        return () => {
            //clean up function. cleans up(unsubscribes) before we call watchLocation again. we are trying to avoid calling watchLocation again with the previous call running.
            subscriber && subscriber.remove()
            subscriber = null
        }
    }, [shouldTrack, callback]) // if shouldTrack changes, run watchLocation
    /* 
    (location) => {
        addLocation(location, recording)
    }
    VIDEO - 257 AND 258
    the recording variable gets called the first time only ie [] because we are not tracking [recording],
    we are only tracking [shouldTrack] ie isFocused. ie we are only get locations out of watchLocation
    when shouldTrack is true. but recording is not being tracked so its still at [] which is false, ie first render.
    ideal situation would be [shouldTrack, callback] (callback is addLocation)
    react checks is the initial instance of callback === new instance of callback (ie if callback is not the same, call watchLocation again)
    the same way it checks if [shouldTrack] === [shouldTrack] (ie if one instance is true and the other false.)
    [shouldTrack, callback] doesnt work tho because we are calling watchLocation too many times till the app crashes.
    Solution:
    using useCallback means the callback is only called when the callback changes. ie when the callback instance is different.
    the callback changes when recording state changes
    [shouldTrack, callback] was calling watchLocation every single time, even when the callback was still the same
    */

    return [err]
}
