const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        roomId: {
            type: String
        },
        sender: {
            type: String
        },
        text: {
            type: String
        },
        attachment: {
            type: String
        }
    }, 
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('Message', messageSchema)