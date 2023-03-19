const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userImage: String,
    bio: String,
    priviledge: {
        type: String,
        enum: ['admin', 'owner', 'visitor']
    } 
}, {
    timestamps: true
})

// argment ------

const User = mongoose.model('User', userSchema)

module.exports = User