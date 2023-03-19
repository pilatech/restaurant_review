const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const likeSchema = new Schema({
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

const Like = mongoose.model('Like', likeSchema)

module.exports = Like