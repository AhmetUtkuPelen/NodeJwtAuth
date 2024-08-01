const express = require('express');
const UserController = require('../controllers/UserController');
const IsAuthenticated = require('../middlewares/IsAuth');


const Router = express.Router()


Router.post('/api/users/register',UserController.register)
Router.post('/api/users/login',UserController.login)
Router.post('/api/users/profile',IsAuthenticated,UserController.profile)


module.exports = Router