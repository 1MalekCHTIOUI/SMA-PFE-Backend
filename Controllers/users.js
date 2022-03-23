const User = require("../Models/User")


exports.getAllUsers = async (req,res,next) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message: "No users available"})
    }
}


exports.getUser = async (req,res,next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: "User not found"})
    }
}