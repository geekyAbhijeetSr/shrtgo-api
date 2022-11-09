const { Router } = require('express')
const redirectControllers = require('../controllers/redirect-controllers')

const router = Router()

router.get('/:code', redirectControllers.redirectUrl)

module.exports = router
