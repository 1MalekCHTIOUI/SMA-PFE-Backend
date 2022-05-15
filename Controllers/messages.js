const Message = require('../Models/Message')

exports.newMessage = async (req, res, next) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({
            roomId: req.params.roomId
        })
        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getLastMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({
            roomId: req.params.roomId
        })

        res.status(200).json(messages[messages.length - 1])

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.readMessages = async (req, res, next) => {
    try {
        // const t = Object.assign({}, object1, {b: 22});
        const messages = await Message.updateMany({
                roomId: req.params.roomId
            }, 
            { $set: {
                [`read.${req.body.currentUserId}`]: true
            }
        })
        
        res.status(200).json({status: true})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

