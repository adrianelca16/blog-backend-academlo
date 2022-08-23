const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')
const postServices = require('../post/post.http')

router.route('/')
    .get(userServices.getAll)

router.route('/me')
    .put(passport.authenticate('jwt', {session: false}), userServices.editMyUser)
    .get(passport.authenticate('jwt', {session:false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session:false}), userServices.deleteMyUser)

router.get('/me/post', passport.authenticate('jwt', {session: false}), postServices.getPostMyUser)

router.route('/me/post/:id')
    .get(passport.authenticate('jwt', {session: false}), postServices.getMyPostById)
    .delete(passport.authenticate('jwt', {session:false}), postServices.deletePost)
    .put(passport.authenticate('jwt', {session:false}), postServices.updatePost)


router.route('/:id')
    .get(userServices.getUsersById)
    .put(passport.authenticate('jwt', {session: false}),userServices.edit)
    .delete(passport.authenticate('jwt', {session: false}),userServices.remove)

    
exports.router = router