const express = require('express')
const cors = require('cors')

const createServer = () => {
    const server = express()

    server.use(express.json())
    server.use(cors({
        origin: ['http://loclahost:3000']
    }))

    return server
}

module.exports = createServer