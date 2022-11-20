const { Router } = require('express')
const redirectControllers = require('../controllers/redirect-controllers')

const router = Router()

// @route   /:code
// @desc    redirect to long url
// @access  public
router.get('/:code', redirectControllers.redirectUrl)

module.exports = router
