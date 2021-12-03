import * as Location from 'expo-location'

const tenMetersWithDegrees = 0.0001 // 10 meters in degrees on the physical world

const getLocation = (increment) => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: -110.9127912 + increment * tenMetersWithDegrees,
            latitude: 32.1504694 + increment * tenMetersWithDegrees
        }
    }
} // returns an object with a timestamp and coords


let counter = 0
    setInterval(() => {
        Location.EventEmitter.emit('Expo.locationChanged', {
            watchId: Location._getCurrentWatchId(),
            location: getLocation(counter)
        })
        counter++
    }, 1000)


/* 
once every sec, we emit an event into the location library. we are faking as if users location has
changed in the real world. Location will be changing by 10m every sec.
*/
