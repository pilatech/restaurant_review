const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const restaurantSchema = new Schema({
    title: String,
    location: String,
    owner: {
        type: Schema.Types.OjecteId,
        ref: 'User'
    },
    images: [String]
}, {
    timestamps: true
})

// schema argumentation ------

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant