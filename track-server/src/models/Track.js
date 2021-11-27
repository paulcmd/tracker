const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})
const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // mongoose.Schema.Types.ObjectId is of type ObjectId. 
        ref: 'User', 
    },
    name: {
        type: String,
        default: '',
    },
    locations: [pointSchema]
})

mongoose.model('Track', trackSchema)


/* 
This is how we indicate that userId is a reference to another object stored in mongoDB.

ref tells mongoose that userId is pointing to an instance of a user in the User model

pointSchema is the schema for the points that are stored in the locations array.
*/