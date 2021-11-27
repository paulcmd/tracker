const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) {  //if the password has not been modified, that means the user is not creating a new password. skip this function
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => { // bcrypt.genSalt(10) will generate a random salt of length 10. we are using a callback because we want to use the salt to hash the password
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash //this is now the password that is saved in the database, we have overwritten the plain text password with the hashed password
            next() //next will now go ahead with the saving process and save our user
        })
    })
})

userSchema.methods.comparePassword = function (candidatePassword) {

    console.log('candidatePassword', candidatePassword)
    console.log('hashed password', this.password)

    const user = this

    return new Promise((resolve, reject) => {

        //compare incoming plaintext password with the hashed password in the database
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(false)
            }
            resolve(true)
        })
    })
}

mongoose.model('User', userSchema)

/* 
userSchema.pre('save', function(next) is a method that runs before the save method is called on the user model. 
in the function, we are going to generate a salt, cobine it with the plain text password, and then hash the result.
we are using the keyword => function and not an arrow function because we want to use the this keyword.
this (word) refers to the user instance(the user we are trying to save), if we use the arrow function, then the value of this will be changed to
the context of this inside this file, which is not what we want. we are trying to get access to the user we are trying to save, thats why we need 
to use the this keyword.

if the user has not tried to modify the password in any way, then dont try to salt anything. just call the next function. otherwise salt
the plain text password and hash it.

gensalt is a method that generates a salt, which is a random string of characters.. 10 is the number of characters in the salt.

candiadatePassword is the plain text password that the user is trying to log in with.

we are creating a Promise because bcrypt will need some time to generate the hash with the candidatePassword and compare the passwords.
*/
