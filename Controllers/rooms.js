const Room = require('../Models/Room')

exports.newRoom = async (req,res,next) => {
    const newRoom = new Room({
        members: [req.body.senderId, req.body.receiverId],
    })
    try {
        const savedRoom = await newRoom.save()
        res.status(200).json(savedRoom)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getRoomByUserId = async (req, res, next) => {
    try {
        const room = await Room.find({
            members: {
                $in: [req.params.userId]
            }
        })
        res.status(200).json(room)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}