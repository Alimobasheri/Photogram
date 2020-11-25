const express = require('express')
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
const app = express()
const PORT = 5000

require('./models/user')

app.use(express.json())

app.use(require('./routes/auth'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('successfully connected to mongoose')
})
mongoose.connection.on('error', (error) => {
    console.log('error in connecting to mongoose: ', error)
})

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})