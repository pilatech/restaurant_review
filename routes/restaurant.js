const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const catchAsync = require('../helpers/catchAsync')
const AppError = require('../helpers/AppError')
const { restaurantSchema } = require('../validSchemas')

function validateRestaurant(req, res, next){
    const { error } = restaurantSchema.validate(req.body)
    if(error){
      const msg = error.details.map(detail => detail.message).join(', ')
      throw new AppError(msg, 400)
    } else {
      next()
    }
   }

router.get('/', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurant/index', { restaurants })
     }))

router.get('/new', (req, res) => {
res.render('restaurant/new')
})

router.post('/', validateRestaurant, catchAsync(async (req, res) => {
        const newRestaurant = new Restaurant(req.body)
        const restaurant = await newRestaurant.save()
        res.redirect(`/restaurants/${restaurant._id}`)
      }))

      router.get('/:id', catchAsync(async (req, res) => {
        const { id } = req.params
        const restaurant = await Restaurant.findById(id).populate('reviews')
        if(!restaurant){
          return new AppError('Restaurant Not Found', 404)
        }
        res.render('restaurant/details', { restaurant })
      }))

router.patch('/:id', validateRestaurant, catchAsync(async (req, res) => {
        const { id } = req.params
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body)
        res.redirect(`/restaurants/${updatedRestaurant._id}`)
      }))
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  await Restaurant.findByIdAndDelete(id)
  res.redirect('/restaurants')
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    res.render('restaurant/edit', { restaurant })
  }))


module.exports = router