import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import trackerApi from '../api/tracker'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signup_error':
            return { ...state, errorMessage: action.payload } //here we are destructuring state because we need token to remain in state and as null
        case 'signup':
            return {
                errorMessage: '',
                token: action.payload
            } //clear error message and authenticate user. no need to destructure state because we are changing both items that are in initial state
        case 'signin_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return {
                errorMessage: '',
                token: action.payload
            }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return {
                token: null,
                errorMessage: ''
            }
        default:
            return state
    }
}

//create action function that checks if token is in storage. if it is then we set isSignedIn to true. else we set it to false

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const tryLocalSignin = (dispatch) => {

    return async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            dispatch({ type: 'signup', payload: token })
        }
        return
    }
}

const signup = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', {
                email,
                password
            })

            await AsyncStorage.setItem('token', response.data.token)
            console.log('Response object from sign up : ', response.data)

            dispatch({ type: 'signup', payload: response.data.token })
            //loading the token in will automatically nav from auth to main flow
        } catch (err) {
            console.log('sign up error : ', err)
            dispatch({
                type: 'signup_error',
                payload: 'Something went wrong with signup'
            })
        }
    }
}

const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', {
                email,
                password
            })

            await AsyncStorage.setItem('token', response.data.token)
            console.log('Response object from sign in : ', response.data)

            dispatch({ type: 'signin', payload: response.data.token })
            //change issignedin to true to automatically nav to main flow
        } catch (err) {
            console.log('sign in error : ', err)
            dispatch({
                type: 'signin_error',
                payload: 'Something went wrong with signin'
            })
        }
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'signout', payload: null })
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' } //if token is present then user is logged in
)

/* 
The token has 2 uses. to authenticate ourselves when we log in and to authenticate the user when we send a request to the server.

*/