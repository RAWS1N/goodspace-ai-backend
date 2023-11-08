const express = require('express')
const { CreateUser, loginUser, logoutUser, fetchMessages } = require('../controllers/userController')
const  isAuthanticated  = require('../middlewares/auth')


const router = express.Router()
// route to fetch user previous chat
router.get("/messages",isAuthanticated,fetchMessages)
// route to handle user logout
router.get('/logout',isAuthanticated,logoutUser)
// route to register and create  user
router.post('/register',CreateUser)
// route to make user login
router.post('/login',loginUser)


module.exports =  router