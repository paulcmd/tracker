import axios from 'axios';

export default axios.create({
    baseURL: 'http://e7e4-2607-fb90-e58f-3485-789b-9579-5e48-f6ba.ngrok.io'
})

/*
this is using the ngrok url in baseURL to create a tunnel to the backend server. the backend server is the express server that 
is running on port 3000. the ngrok url is the url that is created when you run the ngrok command (npm run tunnel) from tracker-server

*/