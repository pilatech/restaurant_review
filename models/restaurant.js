const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')

const restaurantSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    location: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: Review}]
})

restaurantSchema.post('findOneAndDelete', async function(doc){
  if(doc){
    await Review.deleteMany({
        _id: {
            $in: doc.reviews
        }
    })
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant


