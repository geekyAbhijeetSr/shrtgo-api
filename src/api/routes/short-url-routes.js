const { Router } = require('express')
const { createSUValidation, expandSUValidation, validate } = require('../middleware/validation')
const shortUrlControllers = require('../controllers/short-url-controllers')

const router = Router()

// @route   /api/create
// @desc    create short url
// @access  public
router.post('/create', createSUValidation, validate, shortUrlControllers.createShortUrl)

// @route   /api/expand
// @desc    expand short url
// @access  public
router.post('/expand', expandSUValidation, validate, shortUrlControllers.shortUrlExpander)

module.exports = router
