// Imports
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const enforce = require('express-sslify')
const { compileCompiler } = require('./controllers/javaARMController')

require('dotenv').config()
require('./db')
require('./socket')(server)

// Compile Java for ARM
compileCompiler().catch(() => console.log('Failed to compile Java for ARM'))

// JSON parsing and text compression
app.use(express.json())
app.use(compression())

// CORS Policy
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN || '*' : 'http://localhost:3000' || '*',
    methods: ['POST', 'GET'],
    optionsSuccessStatus: 200
}))

// Cookie Plugin
app.use(cookieParser())

// Route Declarations
// const authRouter = require('./routes/authRouter')
// const currencyRouter = require('./routes/currencyRouter')
// const userRouter = require('./routes/userRouter')
// const paymentRouter = require('./routes/paymentRouter')
// const friendRouter = require('./routes/friendRouter')

// app.use('/api', authRouter)
// app.use('/api', currencyRouter),
// app.use('/api', userRouter)
// app.use('/api', paymentRouter)
// app.use('/api', friendRouter)
app.use('/api', require('./routes/scriptRouter'))
app.use('/api', require('./routes/javaARMRouter'))

// Client Production Hosting
if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
    app.use(express.static('../client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

// Server Start
server.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT || 8000}`))