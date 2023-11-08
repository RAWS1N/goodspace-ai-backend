const express = require('express')
const { CreateUser, loginUser, logoutUser, fetchMessages } = require('../controllers/userController')
const  isAuthanticated  = require('../middlewares/auth')


const router = express.Router()

router.get("/messages",isAuthanticated,fetchMessages)
router.get('/logout',isAuthanticated,logoutUser)
router.post('/register',CreateUser)
router.post('/login',loginUser)


module.exports =  router