const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const postServices = require('./post.http')

router.route('/')
    .post(passport.authenticate('jwt', {session: false}) ,postServices.create)
    .get(postServices.getAll)

router.get('/:id', postServices.getPostByID)



exports.router = router