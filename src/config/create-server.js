const express = require('express')
const cors = require('cors')

const createServer = () => {
    const server = express()

    server.use(express.json())
    server.use(
			cors({
				origin: ['https://shrtgo.netlify.app'],
			})
		)

    return server
}

module.exports = createServer