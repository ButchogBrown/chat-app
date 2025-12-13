const express = require('express')
const router = express.Router()
const authorization = require('../middleware/auth')

const { home } = require('../controller/ChatController')

router.get('/home',authorization, home)

module.exports = router