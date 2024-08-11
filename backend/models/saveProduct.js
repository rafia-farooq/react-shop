const mongoose = require("mongoose")

const addProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    unit: {
        type: [String],
        required: true
    },
    date: {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Products', addProductSchema)