const mongoose = require("mongoose")

const addCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },  
    date: {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Categories', addCategorySchema)