const router = require('express').Router({ mergeParams: true })

router.post('/comments', (req, res) => {
    console.log('Adding comment to a post')
    res.status(200).send({
        commentAdded: 'adding comment to restaurant'
    })
})

router.patch('/comments/:commentId', (req, res) => {
    console.log('Editing a comment')
    res.status(200).send({
        commentEdited: 'editing comment'
    })
})

router.delete('/comments/:commentId', (req, res) => {
    console.log('Deleting a comment')
    res.status(200).send({
        deletingComment: 'another comment sent packing'
    })
})

router.post('/dislikes', (req, res) => {
    console.log('Adding Dislike to a post')
    res.status(200).send({
        dislikeAdded: 'adding a dislike to restaurant'
    })
})


router.delete('dislikes/:dislikeId', (req, res) => {
    console.log('Deleting a DisLike')
    res.status(200).send({
        deletingDisLike: 'another dislike sent packing'
    })
})

router.post('/likes', (req, res) => {
    console.log('Adding like to a post')
    res.status(200).send({
        LikeAdded: 'adding like to restaurant'
    })
})

router.delete('/:likeId', (req, res) => {
    console.log('Deleting a Like')
    res.status(200).send({
        deletingLike: 'another Like sent packing'
    })
})


module.exports = router