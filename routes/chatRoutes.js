const express = require('express')
const {handleChatRequest} = require('../controllers/messageController')
const isAuthanticated = require('../middlewares/auth')

const router = express.Router()
// route to handle chat request
router.post('/',isAuthanticated,handleChatRequest)



module.exports = router


