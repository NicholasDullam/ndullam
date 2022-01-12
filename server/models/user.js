const mongoose = require('mongoose')

const User = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_img: { type: String, required: false },
    settings: {
        currency: { type: String, default: 'USD' },
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('User', User)