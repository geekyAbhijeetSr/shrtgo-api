const createServer = require('./config/create-server')
const { unknownRouteHandler, errorHandler } = require('./api/error')
const { shortUrlRoutes, redirectRoutes } = require('./api/routes')

const server = createServer()

server.use('/api/', shortUrlRoutes)
server.use('/', redirectRoutes)

server.use(unknownRouteHandler)
server.use(errorHandler)

module.exports = server
