require('dotenv').config()
const port = 3001

const express = require('express')
const app = express()

//Browser can accept cross origin requests
const cors = require('cors');
app.use(cors());

// Setting up mongodb connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify: false})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Enables express server to accept JSON as a body in API requests
app.use(express.json())
const postsRouter = require('./routes/posts')

app.use(express.static(__dirname + '/uploads'));

// Tells server that when a route with this prefix hit, then redirect the request to the mentioned router
app.use('/post', postsRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})