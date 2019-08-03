const express = require('express')
const api = express.Router()
const userController = require ('../Controller/userController.js')

api.get('/users/', userController.findAllUser)
api.get('/users/:id', userController.findUserById)
api.get('/likes/:id', userController.findLikeById)
api.get('/Userlikes/:email_user', userController.findLikesByUserEmail)
api.post('/likes', userController.createLike)
api.post('/login', userController.login)
api.post('/register', userController.register)

module.exports = api