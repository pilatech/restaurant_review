const router = require('express').Router()

router.get('/', (req, res) => {
    console.log('Sending all restaurants')
    res.status(200).send({
        allRestaurants: 'an array of all restaurants'
    })
})

router.get('/:id', (req, res) => {
    console.log('Sending a single Restaurant')
    res.status(200).send({
        singleRestaurant: 'an object with restaurant data'
    })
})

router.post('/', (req, res) => {
    console.log('Creating new restaurant')
    res.status(200).send({
        restaurantPosted: 'add another restaurant'
    })
})

router.patch('/:id', (req, res) => {
    console.log('Editing a restaurant')
    res.status(200).send({
        editingRestaurant: 'i was done editing'
    })
})

router.delete('/:id', (req, res) => {
    console.log('Deleting a restaurant')
    res.status(200).send({
        deletedRestaurant: 'another restaurant gone!'
    })
})

module.exports = router