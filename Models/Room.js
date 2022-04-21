const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        members: {
            type: Array
        },
        type: {
            type: String,
            default: 'PRIVATE',
            required: false
        }
    }, 
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('Room', roomSchema)