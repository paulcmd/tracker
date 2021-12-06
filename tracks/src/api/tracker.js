import axios from 'axios';

export default axios.create({
    baseURL: 'http://d98f-2607-fb90-e58f-3485-8127-90f-5bd-a5f.ngrok.io'
})

/*
this is using the ngrok url in baseURL to create a tunnel to the backend server. the backend server is the express server that 
is running on port 3000. the ngrok url is the url that is created when you run the ngrok command (npm run tunnel) from tracker-server

*/