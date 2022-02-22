const User = require('../models/user')
const Friend = require('../models/friend')

const createFriendRequest = async (req, res) => {
    const { user_id } = req.body
    try {
        const target = await User.findOne({ _id: user_id })
        if (!target) throw new Error('User does not exist')
        let friend = new Friend({ actor: req.user.id, target: user_id })
        friend = await friend.save()
        return res.status(200).json({ ...friend.toObject(), target  })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const cancelFriendRequest = async (req, res) => {
    const { _id } = req.params
    try {
        const friend = await Friend.findOne({ _id })
        if (!friend) throw new Error('Friend does not exist')
        if (friend.status === 'accepted') throw new Error('Friend request has already been accepted')
        await Friend.deleteOne({ _id })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const acceptFriendRequest = async (req, res) => {
    const { _id } = req.params
    try {
        let friend = await Friend.findOne({ _id })
        if (!friend) throw new Error('Friend does not exist')
        if (friend.status === 'accepted') throw new Error('Friend request has already been accepted')
        friend = await Friend.findOneAndUpdate({ _id }, { status: 'accepted' }, { new: true }).populate('target')
        return res.status(200).json(friend)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteFriend = async (req, res) => {
    const { _id } = req.params
    try {
        const friend = await Friend.findOne({ _id })
        if (!friend) throw new Error('Friend does not exist')
        if (friend.status !== 'accepted') throw new Error('Friend request in progress')
        await Friend.deleteOne({ _id })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    deleteFriend
}