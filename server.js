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
const { v4 } = require('uuid')
const io = require('socket.io')(8900, {
    cors: {
        origin: "*"
    }
})
const socketLogic = require('./Socket/SocketLogic')(io)

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
