const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

//Define a schema for assignmentModel
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

// Make the User model extend or inherit from PLM so it gets all the auth methods/properties
userSchema.plugin(passportLocalMongoose)

//Make public
module.exports = mongoose.model('User', userSchema)