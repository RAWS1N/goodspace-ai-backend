const express = require('express')
const {handleChatRequest} = require('../controllers/messageController')
const isAuthanticated = require('../middlewares/auth')

const router = express.Router()

router.post('/',isAuthanticated,handleChatRequest)



module.exports = router


