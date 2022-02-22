
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const token = req.cookies.accessToken;
    try {
        if (!token) throw new Error('Missing Access Token')
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { ...data, accessToken: token }
        return next()
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
}
  
module.exports = {
    auth
}