const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

mongooseConnect()
.then(console.log('Connected to Database'))
.catch(err => console.log(err));

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/restaurants_reviews');
}


async function addToDB(){
   await Restaurant.deleteMany({})
   const data = await Restaurant.insertMany([
     { title: 'Dominguez Restaurant', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://media.istockphoto.com/photos/portrait-of-asian-senior-man-barista-or-coffee-owner-using-coffee-picture-id1286796686?b=1&k=20&m=1286796686&s=170667a&w=0&h=5gIl4wevDBxJJtt0k2YR2sruaU9oRcUcB-t4L43pr7U=', location: 'Prezo Isle'},
     { title: 'Night & Day Eats', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://media.istockphoto.com/photos/friends-enjoying-a-meal-picture-id524296353?b=1&k=20&m=524296353&s=170667a&w=0&h=YIMSeLeYVOyMj6bl9I8ePoZ1vdw0XmdQ5p_0JnJ8Nxo=', location: 'New Don Boscoshire'},
     { title: 'Smiling Cats Restaurant', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://media.istockphoto.com/photos/portrait-of-asian-senior-man-barista-or-coffee-owner-using-coffee-picture-id1286796686?b=1&k=20&m=1286796686&s=170667a&w=0&h=5gIl4wevDBxJJtt0k2YR2sruaU9oRcUcB-t4L43pr7U=', location: 'Catland Coridor'},
     { title: 'Eat & Lick', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1290237592?b=1&k=20&m=1290237592&s=170667a&w=0&h=fgXWrrQ7qWpbiO8O_dpEVlS4JsTZYH8e3FoZ4UeoQH8=', location: 'The Bridge'},
     { title: 'Chips & Buns Palace', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://media.istockphoto.com/photos/restaurant-kitchen-crew-in-action-picture-id1277763706?b=1&k=20&m=1277763706&s=170667a&w=0&h=oFB9fgBOnyAH-0L4yMWlOj28kDDj6WbPzratZ4spP40=', location: 'Pichtopia'}
   ])

   console.log(data)
}

addToDB()
