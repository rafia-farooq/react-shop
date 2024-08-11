const category = require("../models/category")

const getAllCategories = (request, response) => {
    category.find((error, docs) => {
        if(!error){
            response.send(docs)
        }
        else {
            console.log("No data for category found" + JSON.stringify(error))
        }
    })
}

const postCategory = (request, response) => {
    const data = new category({
        category: request.body.category
    })

    data.save()
        .then(data => response.json(data))
        .catch(error => response.json(error))

    console.log("Category Saved")
}

module.exports ={ getAllCategories, postCategory }