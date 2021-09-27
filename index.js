const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/db')
const userRouter = require('./routes/user-router')
const authenticateJWT = require('./jwt/jwt')

const app = express()

const PORT = process.env.PORT

console.log(process.env)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', authenticateJWT,(req, res) => {
    res.send('Hello World!')
})

app.use('/api', userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))