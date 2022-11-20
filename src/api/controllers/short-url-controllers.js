const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args))
const { HttpError } = require('../error')
const ShortUrl = require('../models/short-url-model')
const { validURL } = require('../helpers/utils')

exports.createShortUrl = async (req, res, next) => {
	try {
		let { url } = req.body

		if (!validURL(url)) {
			const httpError = new HttpError('Url is not valid')
			return next(httpError)
		}

		if (!url.startsWith('http')) url = 'https://' + url

		const urlId = new Date().getTime().toString(36)
		const hostname = new URL(url).hostname.replace('www.', '')
		const shortUrl = process.env.hostname + urlId

		const shortUrlDocs = await new ShortUrl({
			urlId,
			url,
			hostname,
			shortUrl,
		})

		await shortUrlDocs.save()

		res.status(200).json(shortUrlDocs)
	} catch (error) {
		console.error(error)
		const httpError = new HttpError('Creating short url failed', 500)
		return next(httpError)
	}
}

exports.shortUrlExpander = async (req, res, next) => {
	try {
		let { shortUrl } = req.body

		if (!validURL(shortUrl)) {
			const httpError = new HttpError('Short url is not valid')
			return next(httpError)
		}

		if (!shortUrl.startsWith('http')) shortUrl = 'https://' + shortUrl

		const response = await fetch(shortUrl, {
			method: 'HEAD',
			redirect: 'follow',
		})

		if (!response.url) {
			const httpError = new HttpError('Something went wrong')
			return next(httpError)
		}

		const hostname = new URL(response.url).hostname.replace('www.', '')

		res.status(200).json({
			url: response.url,
			hostname,
		})
	} catch (error) {
		console.error(error)
		const httpError = new HttpError('Expanding url failed')
		return next(httpError)
	}
}
