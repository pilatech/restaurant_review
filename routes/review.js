const express = require('express')
const router = express.Router()
const Review = require('../models/review')
const Restaurant = require('../models/restaurant')
const AppError = require('../helpers/AppError')
const catchAsync = require('../helpers/catchAsync')
const { reviewSchema } = require('../validSchemas')

function validateReview(req, res, next){
    const { error } = reviewSchema.validate(req.body)
    if(error){
      const msg = error.details.map(detail => detail.message).join(', ')
      throw new AppError(msg, 400)
    } else {
      next()
    }
   }

router.post('/restaurants/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    const review = new Review(req.body)
    restaurant.reviews.push(review)
    await restaurant.save()
    await review.save()
    res.redirect(`/restaurants/${restaurant._id}`)
  }))
  
  router.delete('/restaurants/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Restaurant.findByIdAndUpdate(id, {$pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(id)
    res.redirect(`/restaurants/${id}`)
  }))

  module.exports = router