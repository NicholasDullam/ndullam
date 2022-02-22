const express = require('express')

const ScriptController = require('../controllers/scriptController')

const router = express.Router()

router.post('/scripts', ScriptController.createScript)
router.post(`/scripts/:_id`, ScriptController.runScript)
router.get(`/scripts/:_id`, ScriptController.getScriptById)
router.get(`/scripts`, ScriptController.getScripts)


module.exports = router