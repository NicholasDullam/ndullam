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

require('dotenv').config()
require('./db')
require('./socket')(server)

// Cookie Plugin
app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.use(cookieParser())

// JSON parsing and text compression
app.use(express.json())
app.use(compression())

// Route Declarations
const authRouter = require('./routes/authRouter')
const currencyRouter = require('./routes/currencyRouter')
const userRouter = require('./routes/userRouter')
const paymentRouter = require('./routes/paymentRouter')
const friendRouter = require('./routes/friendRouter')
const scriptRouter = require('./routes/scriptRouter')

// CORS Policy
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN || '*' : 'http://localhost:3000' || '*',
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use('/api', authRouter)
app.use('/api', currencyRouter),
app.use('/api', userRouter)
app.use('/api', paymentRouter)
app.use('/api', friendRouter)
app.use('/api', scriptRouter)

// Client Production Hosting
app.use(express.static('../client/build'))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => res.sendFile(path.resolve('../client', 'build', 'index.html')))

// Server Start
server.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT || 8000}`))