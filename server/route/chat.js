const express = require('express')
const router = express.Router()
const authorization = require('../middleware/auth')
const { fetchMessages, fetchRecentChat } = require('../controller/MessageController')
const { home } = require('../controller/ChatController')

router.get('/home',authorization, home)
router.get('/recent', authorization, fetchRecentChat)
router.get('/:userId', authorization, fetchMessages)


module.exports = router