const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

const AppError = require('./helpers/AppError')
const restaurantRouter = require('./routes/restaurant')
const reviewRouter = require('./routes/review')

mongooseConnect()
.then(console.log('Connected to Database'))
.catch(err => console.log(err));

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/restaurants_reviews');
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

app.use('/restaurants', restaurantRouter)
app.use('/', reviewRouter)

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