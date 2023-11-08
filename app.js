const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const ChatRoutes = require("./routes/chatRoutes")
const UserRoutes = require('./routes/userRoutes')
const {ErrorMiddleware} = require("./middlewares/ErrorMiddleware")

dotenv.config({
  path : '.env'
})

const app = express()

app.use(cors({
  origin : process.env.FRONTEND_URL,
  methods : "GET,PUT,POST,DELETE",
  credentials:true
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(ErrorMiddleware)

app.use('/message',ChatRoutes)
app.use('/user',UserRoutes)


module.exports = {app}