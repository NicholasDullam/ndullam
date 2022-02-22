const mongoose = require('mongoose')

const Script = new mongoose.Schema({
    _id: 'String',
    type: 'String',
    description: 'String',
    code: 'String',
    args: [
        { type: 'Object', required: false }
    ],
    language: 'String'
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Script', Script)