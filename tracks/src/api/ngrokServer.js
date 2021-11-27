import ngrok from 'ngrok';

const ngrokServer =  async () => {
    const url = await ngrok.connect(3000);
    console.log(url);
}


ngrokServer();

/* 
running npm run tunnel will run this function and give back the url. the url is being used in the axios.create() function in tracker.js
*/