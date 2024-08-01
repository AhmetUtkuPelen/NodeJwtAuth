const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const UserModel = require('../model/UserModel');



const UserController = {

    // ? REGISTER ? \\
    register : asyncHandler(async(req,res)=>{
        
        const {username,email,password} = req.body

        // * validations * \\
        if(!username && !email && !password){
            throw new Error('Please Fill All Inputs !')
        }

        // * Check If User Already Exists Or Not * \\
        const UserExists = await UserModel.findOne({email})

        if(UserExists){
            throw new Error('A User Wİth This Email Already Exists !')
        }

        // * Hash The Password * \\
        const salt = await bcryptjs.genSalt(10)

        const HashedPassword = await bcryptjs.hash(password,salt)

        // * Create The User And Save It Into The DB * \\
        const UserCreated = await UserController.create({
            username,password:HashedPassword,email,
        })

        // * Send The Response * \\
        res.json({username:UserCreated.username,email:UserCreated.email,id:UserCreated.id})


    }),


    // ? LOGIN ? \\
    login : asyncHandler(async (req,res)=>{

        const {username,password} = req.body

        // * Check If User Email Exists Or Not * \\
        const User = await User.findOne({email})

        if(!User){
            throw new Error('Invalid Login Attempt !')
        }

        // * Check If User Password Is Valid Or Not * \\
        const IsMatch = await bcryptjs.compare(password,User.password)

        if(!IsMatch){
            throw new Error('Invalid Login Attempt !')
        }

        // * Generate The Token * \\
        const token = jwt.sign({id:user._id},'anyKey',{expiresIn:'10d'})


        // * Send The Response * \\
        res.json({message:'Login Successfull !',token,id:User._id,email:User.email,username:User.username})
        

    }),


    // ? PROFILE ? \\
    profile : asyncHandler(async(req,res)=>{

        // * Find The User * \\
        const User = await User.findById(req.user).select('-password')

        res.json({User})

    }), 


}


module.exports = UserController