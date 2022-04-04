const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const path = require('path')
const authRouter = require('./Routes/auth')
const userRouter = require('./Routes/users')
const roomRouter = require('./Routes/rooms')
const messageRouter = require('./Routes/messages')

const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

require("dotenv").config({ path: path.resolve(__dirname, './.env') })
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.set("view engine", "ejs")


mongoose.connect("mongodb://127.0.0.1:27017/sma", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB has been connected"))
.catch((err) => console.log("MongoDB Not Connected"))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/messages', messageRouter)

app.listen(PORT, () =>{
    console.log("Server is running on Port: " + PORT)
})

let users = []
const addUser = (userId, socketId) => {
    let test = true
    users.map(user => {
        if(user === userId) {
            return false
        }
    })
    if(test) {
        !users.some(user => user.userId === userId) && users.push({userId, socketId})
    }
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
const removeUser2 = (userId) => {
    users = users.filter(user => user.userId !== userId)
}
const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on('connection', socket => {
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId)
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        })
    })

    // socket.on("disconnect", () => {
    //     console.log("a user disconnected")
    //     removeUser(socket.id)
    //     io.emit('getUsers', users)
    // })
    socket.on("logout", (userId) => {
        removeUser2(userId)
        io.emit('getUsers', users)
    })
})