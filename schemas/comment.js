const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const commentSchema = new Schema({
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

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment