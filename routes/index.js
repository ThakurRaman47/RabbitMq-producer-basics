const express= require('express')
const router = express.Router()

const testController = require('../controllers/testController')

router.post('/test',testController.sendRabbitMqMsg)

module.exports = router