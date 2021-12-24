import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const trackReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const fetchTracks = (dispatch) => {
    return () => {
        dispatch({ type: 'fetch_tracks' })
    }
}

const createTrack = (dispatch) => {
    return async (name, locations) => {
        // make request to api
        //console.log('name and locations from createTrack : ', name, locations.length)
       await trackerApi.post('/tracks', { name, locations })
    }
}

export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
)
