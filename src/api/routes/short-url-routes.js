const { Router } = require('express')
const { createSUValidation, expandSUValidation, validate } = require('../middleware/validation')
const shortUrlControllers = require('../controllers/short-url-controllers')

const router = Router()

router.post('/create', createSUValidation, validate, shortUrlControllers.createShortUrl)
router.post('/expand', expandSUValidation, validate, shortUrlControllers.shortUrlExpander)

module.exports = router
