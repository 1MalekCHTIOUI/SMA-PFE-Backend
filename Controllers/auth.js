const User = require("../Models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')
const { generateRandomPassword } = require('../Utils/scripts')
exports.signup = async (req, res, next) => {
    const { last_name, first_name, email, role } = req.body
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "This Email is already used!"})
    }
    catch(err) {
        console.log(err.message);
    }
    const salt = await bcrypt.genSalt(10)
    const password = generateRandomPassword()
    console.log(password);
    // const hashedPassword = await bcrypt.hash(password, salt)

   /* const newUser = await User.create({ username, email, password: hashedPassword, role });

    if(newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id),
          })
    } else {
        return res.status(400).json("Invalid user data")
    }*/
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors})
        }
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "User does not exist!"})
        try { 
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch) {
                res.json({
                    status: 'success',
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id),
                })
            }else {
                return res.status(400).json({message: "Wrong credentials!"});
            }
        } catch(err) {
            console.log(err.message);
        }
    } catch(err) {
        console.log(err.message);
    }
}
const generateToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '12h'
    })
}

exports.user = async (req, res, next) => {
    try {
        res.status(200).json(req.user)
    }
    catch(err) {
        err.message
    }
}



