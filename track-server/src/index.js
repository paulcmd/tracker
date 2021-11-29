require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes') 
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()
/* 
app.use(bodyParser.json())
body-parser is a middleware that parses the request body 
and exposes it on req.body. it has been deprecated in favor of
express.json() and express.urlencoded() 
 */

/*this has to come above the app.use(authRoutes), the incoming
info has to parsed before authRoutes is called 
*/
app.use(express.json()) //replaces body-parser
app.use(express.urlencoded({ extended: true }))
app.use(authRoutes)
app.use(trackRoutes)

const PORT = process.env.PORT || 3000

const mongoURI =
    'mongodb+srv://admin:admin@cluster0.mlvck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURI)

//callback runs when the connection is successful
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})

//callback runs when the connection fails
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo : ', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

/* 
A router is a small object that allows us to associate some number of route handlers with it
 ie a path and a function that will handle that path.

 whenever someone tries to access the root route, the requireAuth middleware will be called first, check if the user provided a valid token,
if not, send back a 401 error. if they did provide a valid token, then the next middleware will be called, which is the next callback function in the route,
if there are no other middleswares.

In postman, make a get request, under headers, add a header called authorization with the value of the token in format Bearer <token>. then go to protected route.
*/
