const express = require('express')

const UserController = require('../controllers/userController')
const { auth } = require('../middleware/auth')

const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:_id', auth, UserController.getUserById)
router.get('/users/:_id/friends', auth, UserController.getFriends)
router.put('/users/:_id', auth, UserController.updateUserById)
router.delete('/users/:_id', auth, UserController.deleteUserById)

module.exports = router