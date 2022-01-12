const mongoose = require('mongoose')

const Currency = mongoose.Schema({
    _id: { type: String, required: true },
    base: { type: String, ref: 'Currency', required: true },
    value: { type: Number, default: 1 },
    valued_at: { type: Date, required: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.Model('Currency', Currency)