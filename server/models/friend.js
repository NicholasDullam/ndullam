const mongoose = require('mongoose')

const Friend = new mongoose.Schema({
    actor: { type: mongoose.Types.ObjectId, required: true },
    target: { type: mongoose.Types.ObjectId, required: true },
    status: { type: String, default: 'pending' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Friend', Friend)