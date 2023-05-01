const express = require('express')

const JavaARMController = require('../controllers/javaARMController')

const router = express.Router()

router.post('/java-arm/compile', JavaARMController.compileCode)

module.exports = router