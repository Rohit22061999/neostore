const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    buyer: {
        type: String,
        required: true
    },
    orderlist: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Order', orderSchema)