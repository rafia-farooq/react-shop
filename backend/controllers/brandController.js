const brand = require("../models/brand")

const getAllBrands = (request, response) => {
    brand.find((error, docs) => {
        if(!error){
            response.send(docs)
        }
        else {
            console.log("No data for brand found" + JSON.stringify(error))
        }
    })
}

const postBrand = (request, response) => {
    const data = new brand({
        brand: request.body.brand,
        category: request.body.category
    })

    data.save()
        .then(data => response.json(data))
        .catch(error => response.json(error))

    console.log("Brand Saved")
}

module.exports ={ getAllBrands, postBrand }