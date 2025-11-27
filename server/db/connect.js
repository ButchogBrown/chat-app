const mongoose = require('mongoose')

mongoose.set('strict', false)
 
exports.connectDB = (url) => {
    mongoose.connect(url)
}

