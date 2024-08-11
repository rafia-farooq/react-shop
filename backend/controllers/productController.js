const saveProduct = require("../models/saveProduct")
const productId = require('mongoose').Types.ObjectId

const getAllProducts = (request, response) => {
    saveProduct.find((error, docs) => {
        if(!error){
            response.send(docs)
        }
        else {
            console.log("No data for products found" + JSON.stringify(error))
        }
    })
}

const postProduct = (request, response) => {
    const data = new saveProduct({
        category: request.body.category,
        name: request.body.name,
        price: request.body.price,
        description: request.body.description,
        likes: request.body.likes,
        image: request.body.image,
        unit: request.body.unit
    })

    data.save()
        .then(data => response.json(data))
        .catch(error => response.json(error))

    console.log("Product Saved")
}


const getSingleProduct = (request, response) => {

    if (!productId.isValid(request.params.id)){
        return response.status(400).send("Selected ID not found: " + request.params.id)
    }

    saveProduct.findById(
            request.params.id,
            (error, docs) => {

            if(!error){
                response.send(docs)
            }
            else {
                console.log("ID for this product not found" + JSON.stringify(error))
            }
        })
}

const updateProduct = (request, response) => {

    if (!productId.isValid(request.params.id)){
        return response.status(400).send("Selected ID not found: " + request.params.id)
    }

    const data = {
        category: request.body.category,
        name: request.body.name,
        price: request.body.price,
        description: request.body.description,
        likes: request.body.likes,
        image: request.body.image
    }

    saveProduct.findByIdAndUpdate(
        request.params.id, 
        {$set: data},
        {new: true},
        (error, docs) => {
            if(!error){
                response.send(docs)
            }
            else {
                console.log("ID for this product not found" + JSON.stringify(error))
            }
        })
    }
        

const deleteProduct = (request, response) => {

    if (!productId.isValid(request.params.id)){
        return response.status(400).send("Selected ID not found: " + request.params.id)
    }

        saveProduct.findByIdAndRemove(
            request.params.id, 
            (error, docs) => {
            if(!error){
                response.send("Product Deleted")
            }
            else {
                console.log("Product not deleted" + JSON.stringify(error))
            }
        })
}

module.exports ={ getAllProducts, postProduct, getSingleProduct, updateProduct, deleteProduct }