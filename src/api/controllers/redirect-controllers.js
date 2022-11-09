const { HttpError } = require('../error')
const ShortUrl = require('../models/short-url-model')

exports.redirectUrl = async (req, res, next) => {
	try {
		const { code } = req.params

		const found = await ShortUrl.findOne({
			urlId: code,
		})

		if (found) {
			found.noOfClicks++
			await found.save()
			res.redirect(found.url)
		} else {
			res.status(404).json({
				error: 'Url not found!',
			})
		}
	} catch (error) {
		console.error(error)
		const httpError = new HttpError()
		return next(httpError)
	}
}
