const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.sendStatus(401).send({ error: 'You must be logged in' }) //if there is no authorization header, send a 401 status code and an error message
    }

    const token = authorization.replace('Bearer ', '') //remove the Bearer from the token

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        //payload is the decoded token. it contains the userId
        if (err) {
            return res.status(401).send({ error: 'You must be logged in' }) //401 is unauthorized. user provided an invalid token
        }

        console.log( 'Payload from requireAuth : ',payload )

        const { userId } = payload

        const user = await User.findById(userId) //find the user by the userId in the mongoDB database

        req.user = user //add the user to the request object

        next() //continue to the next middleware, in this case, the route handler because there are no more middlewares to run
    })
}

/* 
next() is a function that is called to siginify that the middleware has completed
its job and that the request can be handled by the next middleware or the route handler.
if the middleware is the last one in the chain, then the request will be handled by the route handler ie.
 authRoutes.js in this case
*/
