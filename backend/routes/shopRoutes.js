const express = require('express')
const shopRoute = express.Router()

const { getAllProducts, postProduct, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController")

shopRoute.get('/getProducts', getAllProducts)
// http://localhost:4000/shop/getProducts

shopRoute.post('/addProduct', postProduct)
// http://localhost:4000/shop/addProduct

shopRoute.get('/product/:id', getSingleProduct)
// http://localhost:4000/shop/product/{id}

shopRoute.patch('/:id/edit', updateProduct)
// http://localhost:4000/shop/{id}/edit

shopRoute.delete('/:id', deleteProduct)
// http://localhost:4000/shop/{id}


module.exports = shopRoute