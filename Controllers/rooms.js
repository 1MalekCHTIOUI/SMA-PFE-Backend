const { v4 } = require('uuid')
const Room = require('../Models/Room')
const Message = require('../Models/Message')

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

exports.newGroupRoom = async (req,res,next) => {
    const newRoom = new Room({
        members: req.body.members,
        type: 'PUBLIC',
        name: req.body.name,
    })
    try {
        const savedRoom = await newRoom.save()
        res.status(200).json(savedRoom)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.addNewGroupMember = async (req,res,next) => {
    const roomId = req.params.roomId
    const members = req.body.members

    try {
        const room = await Room.findById(roomId)
        room.members.map(member => {
            if(members.includes(member)) {
                return res.status(500).json({message: "User already member of group"})
            }
        })
        try{
            const updatedRoom = await Room.findByIdAndUpdate(roomId, {
                $push: {members: {$each: [members]}}
            })
            res.status(200).json(updatedRoom)
        } catch(err){
            res.status(500).json({message: err.message})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
exports.removeGroupMember = async (req,res,next) => {
    const {roomId, memberId} = req.params
    try {
        if(roomId === undefined && memberId === undefined) {
            res.status(500).json({message: "Wrong data"})
        }
        const deletedUser = await Room.findByIdAndUpdate(roomId, {
            $pull: {members: memberId}
        })
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.removeGroup = async (req,res,next) => {
    const roomId = req.params.roomId
    try {
        await Room.findByIdAndDelete(roomId)
        res.status(200).json("Room deleted!")
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

exports.getRoom = async (req, res, next) => {
    const {roomId} = req.params
    try {
        const room = await Room.findById(roomId)
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteMessagesFromRoom = async (req, res, next) => {
    const {roomId} = req.params
    try {
        const messages = await Message.deleteMany({roomId: roomId})
        res.status(200).json({message: 'Messages deleted from room'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
