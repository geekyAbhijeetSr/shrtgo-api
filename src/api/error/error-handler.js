const errorHandler = (error, req, res, next) => {
    if (res.headerSent) return next(error)
    const { message = 'Internal server error', code = 500 } = error

    res.status(code)
        .json({
        error: Array.isArray(message) ? message[0].msg : message
    })
}

module.exports = errorHandler