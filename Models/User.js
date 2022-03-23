const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },    
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true,
        default: ['USER']
    }
    }, 
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)