const mongoose = require('mongoose')
let subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('subscriber', subscriberSchema)