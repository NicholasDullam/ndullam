const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to db')
})

mongoose.connection.on('error', () => {
    console.log('Error connecting to db')
})

const db = mongoose.connection

module.exports = db