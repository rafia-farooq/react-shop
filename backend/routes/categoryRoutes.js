const express = require('express')
const shopRoute = express.Router()

const { getAllCategories, postCategory } = require("../controllers/categoryController")

shopRoute.get('/getCategories', getAllCategories)
// http://localhost:4000/category/getCategories

shopRoute.post('/addCategory', postCategory)
// http://localhost:4000/category/addCategory


module.exports = shopRoute