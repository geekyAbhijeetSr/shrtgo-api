const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_uri)
        console.log('Connected to database successfully')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB