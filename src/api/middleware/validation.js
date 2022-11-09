const { body, validationResult } = require('express-validator')
const { HttpError } = require('../error')

exports.createSUValidation = [
	body('url').notEmpty().withMessage('Url is required'),
]

exports.expandSUValidation = [
    body('shortUrl').notEmpty().withMessage('Short url is required')
]

exports.validate = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const error = new HttpError(errors.array(), 422)
		return next(error)
	}
	next()
}
