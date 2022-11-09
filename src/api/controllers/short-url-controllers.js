const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args))
const { HttpError } = require('../error')
const { isValidUrl } = require('../helpers/utils')
const ShortUrl = require('../models/short-url-model')

exports.createShortUrl = async (req, res, next) => {
	try {
		let { url } = req.body

		if (!url.startsWith('http')) url = 'https://' + url

		if (!isValidUrl(url)) {
			const httpError = new HttpError('Url is not valid')
			return next(httpError)
		}

		const found = await ShortUrl.findOne({
			url,
		})

		if (found) {
			return res.status(200).json(found)
		}

		const uid = new Date().getTime().toString(36)

		const shortUrl = await new ShortUrl({
			urlId: uid,
			url,
			shortUrl: process.env.base_url + uid,
		})

		await shortUrl.save()

		res.status(200).json(shortUrl)
	} catch (error) {
		console.error(error)
		const httpError = new HttpError('Creating short url failed', 500)
		return next(httpError)
	}
}

exports.shortUrlExpander = async (req, res, next) => {
	try {
		let { shortUrl } = req.body

		if (!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl

		if (!isValidUrl(shortUrl)) {
			const httpError = new HttpError('Short url is not valid')
			return next(httpError)
		}

		const response = await fetch(shortUrl, {
			redirect: 'follow',
		})

		if (!response.url) {
			const httpError = new HttpError('Something went wrong')
			return next(httpError)
		}

		res.status(200).json({
			url: response.url,
		})
	} catch (error) {
		const httpError = new HttpError('Expanding url failed')
		return next(httpError)
	}
}
