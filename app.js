const express = require('express')
const app = express()
const mongoose = require('mongoose')

const restaurantsRoutes = require('./routes/restaurants')
const usersRoutes = require('./routes/users')


app.get('/', (req, res) => {
  res.status(200).send({
    allRestaurants: 'an array'
  })
})

app.use('/restaurants', restaurantsRoutes)

app.use('/users', usersRoutes)


app.listen(3000, () => console.log('Listening on 3000...'))