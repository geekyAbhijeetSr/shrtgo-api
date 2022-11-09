exports.isValidUrl = string => {
	let givenURL
	try {
		givenURL = new URL(string)
	} catch (error) {
		console.log('error is', error)
		return false
	}
	return givenURL.protocol === 'http:' || givenURL.protocol === 'https:'
}
