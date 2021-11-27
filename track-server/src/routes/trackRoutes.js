const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track') // this gives us access to the Track model

const router = express.Router()

router.use(requireAuth) // this ensures that the user is authenticated before they can access the routes

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id }) // this is a query to find all the tracks that belong to the user. the user was attached to the request by the requireAuth middleware

    res.send(tracks)
})

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body // this is the body of the request that was sent to the server

    if (!name || !locations) {
        return res
            .status(422)
            .send({ error: 'You must provide a name and locations' }) // 422 is a status code for unprocessable entity
    }

    try {
        const track = new Track({ name, locations, userId: req.user._id }) // this creates a new track object and attaches the userId to it
        await track.save() // this saves the track to the database
        res.send(track) // this sends the track back to the client
    } catch (err) {
        res.status(422).send(err.message)
    }
})

module.exports = router
