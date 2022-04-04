const User = require("../Models/User")
const bcrypt = require('bcrypt')

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

exports.editUser = async (req,res,next) => {
    if (req.body._id === req.params.id) {
        if (req.body.password) {
          try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
          } catch (err) {
            return res.status(500).json(err);
          }
        }
        try {
          await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.status(200).json({message: "Account has been updated"});
        } catch (err) {
          return res.status(500).json(err);
        }
    } else {
    return res.status(400).json({message: "You can update only your account!"});
    }
}

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Account has been deleted"});
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.comparePasswords = async(req, res, next) => {
  const {email, oldPassword} = req.body
  const user = await User.findOne({email})
  try { 
      const isMatch = await bcrypt.compare(oldPassword, user?.password)
      if(isMatch) {
        res.json({
            same: true,
        })
      }else {
        res.json({
          same: false,
      })
      }
  } catch(err) {
      console.log(err.message);
  }
}