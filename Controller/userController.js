const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../model/userModel');
const jwt = require('jsonwebtoken')

const register = asyncHandler(async(req,res)=>{
    const {username,email,password}  = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please provide all the details...")
    }
    const userData = await User.findOne({email});
    console.log(userData);
    if(userData){
        res.status(400);
        throw new Error('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log('Hashed Password : ',hashedPassword);
    const user = await User.create(
        {
            username,
            email,
            password : hashedPassword
        }
    );
    console.log(`User created : ${user}`);
    if(user){
        res.status(200).json({id: user.id , email : user.email})
    }
    else{
        res.status(400)
        throw new Error('User data not valid...')
    }
})

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('Validation failure')
    }
    const user = await User.findOne({email})
    // compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_KEY_SECRET, {expiresIn: "15m"})
        res.status(200).json({accesstoken})
    }
    else{
        res.status(401);
        throw new Error(
            'Validation error'
        )
    }
})

const current = asyncHandler(async(req,res)=>{
    res.status(201).json(req.user)
})

module.exports = {login, register, current}