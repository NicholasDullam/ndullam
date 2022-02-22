const express = require('express')

const FriendController = require('../controllers/friendController')
const { auth } = require('../middleware/auth')

const router = express.Router()

router.post('/friends', auth, FriendController.createFriendRequest)
router.put('/friends/:_id/accept', auth, FriendController.acceptFriendRequest)
router.put('/friends/:_id/cancel', auth, FriendController.cancelFriendRequest)
router.delete('/friends/:_id', auth, FriendController.deleteFriend)

module.exports = router