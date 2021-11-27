const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User') //a reference to the User model

//A route is a path that is handled by a specific function
const router = express.Router()

router.post('/signup', async (req, res) => {
    console.log('REQ OBJECT FROM SIGNUP: ', req.body)
    const { email, password } = req.body

    try {
        //create a new user
        const user = new User({ email, password })

        //save the user to the database
        await user.save()

        //generate a token for the user
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ token })
    } catch (err) {
       return res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    console.log('REQ OBJECT FROM SIGNIN: ', req.body)

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' })
    }

    const user = await User.findOne({ email }) 

    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' })
    }

    try {
        await user.comparePassword(password) //this is a method that is defined in the User model
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ token })
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' })
    }
})

module.exports = router

/* 
the token is used to identify the user when the user makes a request to the server.
if the user sends a valid token, the server will know that the user is authenticated.

test1@test.com
*/