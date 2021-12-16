const dotenv = require('dotenv')
const express = require("express")
const path = require("path")
const app = express()
const sslRedirect = require('heroku-ssl-redirect');
const port = process.env.PORT || 8000

app.use(express.static('../client/build'))

if (process.env.NODE_ENV === 'production') {
    app.use(sslRedirect.default());
    app.use(express.static('../client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => res.sendFile(path.resolve('../client', 'build', 'index.html')))

app.listen(port, () => console.log(`Server running on port ${port}`))