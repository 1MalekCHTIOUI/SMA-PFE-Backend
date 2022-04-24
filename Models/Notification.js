const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        title: {
            type: String,
        },
        content: {
            type: String
        },
        sender: {
            type: String
        },
        read: {
            type: Boolean,
            default: false
        }
    }, 
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('Notification', notificationSchema)