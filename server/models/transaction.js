const mongoose = require('mongoose')

const Transaction = new mongoose.Schema({
    actor: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    target: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, ref: 'currency', default: 'USD' },
    type: { type: String, default: 'request' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
})

module.exports = mongoose.model('Transaction', Transaction)