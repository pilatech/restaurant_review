const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

const Restaurant = require('./models/restaurant')
const Review = require('./models/review')
const AppError = require('./helpers/AppError')
const catchAsync = require('./helpers/catchAsync')
const { restaurantSchema, reviewSchema } = require('./validSchemas')

mongooseConnect()
.then(console.log('Connected to Database'))
.catch(err => console.log(err));

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/restaurants_reviews');
}

function validateRestaurant(req, res, next){
 const { error } = restaurantSchema.validate(req.body)
 if(error){
   const msg = error.details.map(detail => detail.message).join(', ')
   throw new AppError(msg, 400)
 } else {
   next()
 }
}

function validateReview(req, res, next){
  const { error } = reviewSchema.validate(req.body)
  if(error){
    const msg = error.details.map(detail => detail.message).join(', ')
    throw new AppError(msg, 400)
  } else {
    next()
  }
 }

const app = express()

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    res.redirect('/restaurants')
})

app.get('/restaurants', catchAsync(async (req, res) => {
  const restaurants = await Restaurant.find({})
  res.render('restaurant/index', { restaurants })
}))

app.post('/restaurants', validateRestaurant, catchAsync(async (req, res) => {
  const newRestaurant = new Restaurant(req.body)
  const restaurant = await newRestaurant.save()
  res.redirect(`/restaurants/${restaurant._id}`)
}))

app.get('/restaurants/new', (req, res) => {
  res.render('restaurant/new')
})

app.get('/restaurants/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  const restaurant = await Restaurant.findById(id).populate('reviews')
  if(!restaurant){
    return new AppError('Restaurant Not Found', 404)
  }
  res.render('restaurant/details', { restaurant })
}))

app.patch('/restaurants/:id', validateRestaurant, catchAsync(async (req, res) => {
  const { id } = req.params
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body)
  res.redirect(`/restaurants/${updatedRestaurant._id}`)
}))

app.delete('/restaurants/:id', catchAsync(async (req, res) => {
  const { id } = req.params
  await Restaurant.findByIdAndDelete(id)
  res.redirect('/restaurants')
}))

app.get('/restaurants/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params
  const restaurant = await Restaurant.findById(id)
  res.render('restaurant/edit', { restaurant })
}))

app.post('/restaurants/:id/reviews', validateReview, catchAsync(async (req, res) => {
  const { id } = req.params
  const restaurant = await Restaurant.findById(id)
  const review = new Review(req.body)
  restaurant.reviews.push(review)
  await restaurant.save()
  await review.save()
  res.redirect(`/restaurants/${restaurant._id}`)
}))

app.delete('/restaurants/:id/reviews/:reviewId', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params
  await Restaurant.findByIdAndUpdate(id, {$pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(id)
  res.redirect(`/restaurants/${id}`)
}))

app.use((req, res) => {
  throw new AppError('Page Not Found!', 404)
})

app.use((err, req, res, next) => {
  if(!err.message) err.message = "Something in not right!"
  if(!err.status) err.status = 500
  res.status(err.status).render('error', { err })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})