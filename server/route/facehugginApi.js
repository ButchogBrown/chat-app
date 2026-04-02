const express = require('express')

const router = express.Router()
const authorization = require('../middleware/auth')
const { generateText } = require('../controller/FacehuggingController')

router.post('/chat/ai', authorization, generateText )

module.exports = router