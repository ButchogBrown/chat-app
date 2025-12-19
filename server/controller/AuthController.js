const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {BadRequestError} = require('../error')

exports.register = async (req,res, next) => {
    try {
        const {name, email, password, confirmPassword} = req.body 
        const existingUser = await User.findOne({email})

        if(existingUser) {
            throw new BadRequestError('Email is already registered')
        }
        if(password !== confirmPassword ){
            throw new BadRequestError('Password do not match')
        }

        const user = await User.create({name, email, password})
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({token})
    }catch (error) {
        next(error)
    }
}

exports.login = async (req,res, next) => {
    try {
        const {email, password} = req.body

        const user = await  User.findOne({email})

        if(!user) {
            throw new BadRequestError("Email not found")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            throw new BadRequestError("Invalid email or password")
        }
        
        const token = jwt.sign({userId: user._id, userName: user.name}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).status(200).json({ user })

        // res.status(200).json({token})
    }catch(error) {
        console.log(error)
        next(error)
    }    
}

exports.logout = (req, res) => {
    res.clearCookie("access_token")
    // res.cookie("token", "", {
    //     httpOnly: true,
    //      secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //      path: "/",          // important! must match original cookie path
    //     expires: new Date(0) // delete the cookie
    // });

    res.status(200).json({ message: "Successfully logged out!" });
}
