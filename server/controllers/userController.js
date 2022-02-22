const User = require('../models/user')
const Friend = require('../models/friend')
const Token = require('../models/token')
const bcrypt = require('bcrypt')
const { signAccessToken, maxAge } = require("./authController")

const createUser = async (req, res) => {
    const { first, last, email, password } = req.body
    try {
        const old = await User.findOne({ email })
        if (old) throw new Error('User already exists')

        const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

        let user = new User({ first, last, email, password: hash })
        user = await user.save()

        const accessToken = await signAccessToken({ id: user._id, email })
        const token = new Token({ user_id: user._id, token: accessToken.token, expire: Date.now() + maxAge })
        await token.save()

        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: maxAge, secure: process.env.NODE_ENV === 'production' ? true : false })     
        return res.status(200).json({ token: token.token, user })   
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    let query = { ...req.query }, reserved = ['sort', 'skip', 'limit'], pipeline = []
    reserved.forEach((el) => delete query[el])

    pipeline.push({ $match: query })
    if (req.query.sort) pipeline.push({ $sort: getSort(req.query.sort) })
    pipeline.push({ 
        $project: {
            password: 0
        }
    })
    
    // paginate pipeline facet
    pipeline.push({
        $facet: {
            data: function paginate () {
                let data = []
                if (req.query.skip) data.push({ $skip: Number(req.query.skip) })
                if (req.query.limit) data.push({ $limit: Number(req.query.limit) })
                return data
            } (),
            summary: [{ $count: 'count' }]
        }
    })

    //paginate pipeline count removal
    pipeline.push({
        $project: {
            data: '$data',
            summary: { $arrayElemAt: [ "$summary", 0 ]}
        }
    })

    User.aggregate(pipeline).then((response) => {
        return res.status(200).json({ ...response[0], summary: { count: response[0].summary ? response[0].summary.count : 0, has_more: (Number(req.query.skip) || 0) + (Number(req.query.limit) || 0) < (response[0].summary ? response[0].summary.count : 0) }})    
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const getFriends = async (req, res) => {

}

const getUserById = async (req, res) => {
    let { _id } = req.params
    User.findById(_id).select('-password -email -acct_id -cust_id').then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const updateUserById = async (req, res) => {
    let { _id } = req.params 
    User.findByIdAndUpdate(_id, req.body, { new: true }).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.status(400).json({ error: error.message })
    })
}

const deleteUserById = async (req, res) => {
    let { _id } = req.params
    User.findByIdAndDelete(_id).then((response) => {
        return res.status(200).json(response)
    }).catch((error) => {
        return res.staus(400).json({ error: error.message })
    })
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getFriends,
    updateUserById,
    deleteUserById
}