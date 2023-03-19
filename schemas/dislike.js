const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const dislikeSchema = new Schema({
    text: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
}, 
{
    timestamps: true
})


// augment ===

const Dislike = mongoose.model('Dislike', dislikeSchema)

module.exports = Dislike