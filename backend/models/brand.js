const mongoose = require("mongoose")

const addBrandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    }, 
    
    category: {
        type: String,
        required: true
    }, 

    date: {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Brands', addBrandSchema)