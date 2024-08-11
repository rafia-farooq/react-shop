const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const getUsers = (request, response) => {
    userModel.find((error, docs) => {
        if(!error)
            response.send(docs)
        else
            console.log("Data Not Found: " + JSON.stringify(error))

    })
}

const registerUser = (request, response) => {

    // const salt = await bcrypt.genSalt(5)
    // const newPassword = await bcrypt.hash(request.body.password, salt)

    const data = new userModel({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })
    data.save()
        .then(data => response.json(data))
        .catch(error => response.json(error))

    console.log("Saved")
}



const loginUser = (request, response) => {

    // const salt = await bcrypt.genSalt(5)
    // const crypted = await bcrypt.hash(request.body.password, salt)

    const loginData = {
        email: request.body.email,
        password: request.body.password
    }

    //Select * from user WHERE email = ' ' AND password = ' '
    userModel.findOne(loginData, (error, docs) => {
        if(!error){
            if(docs){
                response.send(docs)
            }
            else {
                response.send("Wrong email or password")
            }
        }

        else{
            console.log("Data not Found" + JSON.stringify(error))
            response.send("Data not Found" + JSON.stringify(error))
        }
    })
}

module.exports = { registerUser, getUsers, loginUser }