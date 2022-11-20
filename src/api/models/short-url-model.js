const mongoose = require('mongoose')

const shortUrlSchema = mongoose.Schema({
    urlId: {
        type: String,
    },
    url: {
        type: String,
        trim: true
    }, 
    hostname: {
        type: String,
    },
    shortUrl: {
        type: String,
    },
    noOfClicks: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

const ShortUrlModel = mongoose.model('ShortUrl', shortUrlSchema)

module.exports = ShortUrlModel
