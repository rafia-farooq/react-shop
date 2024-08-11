const express = require('express')
const brandRoute = express.Router()

const { getAllBrands, postBrand } = require("../controllers/BrandController")

brandRoute.get('/getBrands', getAllBrands)
// http://localhost:4000/brand/getBrands

brandRoute.post('/addBrand', postBrand)
// http://localhost:4000/brand/addBrand


module.exports = brandRoute