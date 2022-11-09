const mongoose = require('mongoose')

const shortUrlSchema = mongoose.Schema({
    urlId: {
        type: String,
    },
    url: {
        type: String,
        trim: true
    }, 
    shortUrl: {
        type: String,
        trim: true
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
