const User = require('../models/user')
const Token = require('../models/token')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const maxAge = 1000 * 3600 * 24 * 7 * 2

const signAccessToken = async (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge })
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) throw new Error('User does not exist')

        const match = bcrypt.compare(password, user.password)
        if (!match) throw new Error('Password invalid')

        const accessToken = await signAccessToken({ id: user._id, email })
        const token = new Token({ user_id: user._id, token: accessToken, expires: Date.now() + maxAge })
        await token.save()

        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: maxAge, secure: process.env.NODE_ENV === 'production' ? true : false })
        return res.status(200).json({ accessToken, user })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const logout = async (req, res) => {
    const { accessToken } = req.user
    try {
        const token = await Token.findOne({ token: accessToken })
        if (!token) throw new Error('Already signed out')

        await Token.deleteOne({ _id: token._id })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const verifyToken = (req, res) => {

}

module.exports = {
    login,
    logout,
    verifyToken,
    signAccessToken,
    maxAge
}