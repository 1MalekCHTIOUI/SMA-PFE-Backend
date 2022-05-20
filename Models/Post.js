const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        attachment: {
            type: Array,
            required: false
        },
        likes: {
            type: Array,
            required: false
        },
        comments: {
            type: Array,
            required: false
        }
    }, 
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('Post', postSchema)