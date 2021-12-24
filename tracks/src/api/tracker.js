import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosInstance = axios.create({
    baseURL: 'http://dab1-2607-fb90-729d-572a-951c-ef61-6289-25c3.ngrok.io'
})

axiosInstance.interceptors.request.use(
    // Function called before request is sent(intercepts request)
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`  //if we have a token, add it to the header as a Bearer token
            console.log('config.headers.Authorization', config)
        }
        return config
    },

    //Function called when we have an error before sending the request eg if we have an intenet connection error
    (err) => {
        return Promise.reject(err)
    }
)

export default axiosInstance

/*
this is using the ngrok url in baseURL to create a tunnel to the backend server. the backend server is the express server that 
is running on port 3000. the ngrok url is the url that is created when you run the ngrok command (npm run tunnel) from tracker-server

we can grab our token out of asyncStorage and set it in the header(thru config) of our axios request, this way we are automatically authenticated on the server and can eg save our track
thus we wont need to attach the token to the request body with every POST request to the server eg when sending a new track to the server
*/
