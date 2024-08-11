const express = require('express')
const userRoute = express.Router()

const { registerUser, getUsers, loginUser } = require('../controllers/userController')

userRoute.get('/', getUsers)
//http://localhost:4000/user

userRoute.post('/register', registerUser)
//http://localhost:4000/user/register

userRoute.post('/login', loginUser)
//http://localhost:4000/user/login

module.exports = userRoute