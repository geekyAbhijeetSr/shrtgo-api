const connectDB = require('./config/connect-db')
const server = require('./server')

const port = process.env.port || 5000

;(async () => {
	try {
		await connectDB()
		server.listen(port, () =>
			console.log(`Server is listening on port ${port}`)
		)
	} catch (error) {
		console.error(error)
	}
})()
