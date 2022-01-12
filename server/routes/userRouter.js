const express = require('express')

const UserController = require('../controllers/userController')

const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:_id', UserController.getUserById)
router.get('/users/:_id/friends', UserController.getFriends)
router.put('/users/:_id', UserController.updateUserById)
router.delete('/users/:_id', UserController.deleteUserById)

module.exports = router