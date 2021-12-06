import axios from 'axios';

export default axios.create({
    baseURL: 'http://be04-2607-fb90-e58f-3485-c0f1-ef22-7678-8b1f.ngrok.io'
})

/*
this is using the ngrok url in baseURL to create a tunnel to the backend server. the backend server is the express server that 
is running on port 3000. the ngrok url is the url that is created when you run the ngrok command (npm run tunnel) from tracker-server

*/