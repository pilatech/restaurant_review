const router = require('express').Router()

router.get('/', (req, res) => {
    console.log('Get all users')
    res.status(200).send({
        allUsers: 'an array of users'
    })
})

router.post('/', (req, res) => {
    console.log('Create new user')
    res.status(200).send({
        userCreated: 'new user added!'
    })
})

router.get('/:id', (req, res) => {
    console.log('Requesting data about a user')
    res.status(200).send({
        userData: 'an object containing user data'
    })
})

router.patch('/:id', (req, res) => {
    console.log('Editing a user')
    res.status(200).send({
        editedUser: 'another user has new info'
    })
})

router.delete(':id', (req, res) => {
    console.log('Another user deleted')
    res.send({
        userDeleted: 'There is another user that is gone!'
    })
})

module.exports = router