const { v4 } = require("uuid")

module.exports = (io) => {
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


    const ROOM_ID = v4()

    const userss = {};
        
    const socketToRoom = {};
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

        socket.on("sendNotification", ({senderId, receiverId, content}) => {
            const user = getUser(receiverId)
            io.to(user?.socketId).emit("getNotification", {
                senderId,
                content
            })
        })

        socket.on("sendGroupMessage", ({senderId, roomId, text}) => {
            io.to(user?.roomId).emit("getMessage", {
                senderId,
                text
            })
        })
        io.emit("getRoomID", ROOM_ID)
        
        socket.on("callNotif", ({caller, id})=>{
            const user = getUser(id)
            try {
                io.to(user?.socketId).emit("notif", {msg: `${caller.fullName} is calling you!`, caller: caller.fullName})
                io.to(user?.socketId).emit("getCallerID", caller.id)
            } catch (error) {
                console.log(error);           
            }

        })

        socket.on("declineCall", ({callerId, declinerName}) => {
            const user = getUser(callerId)
            try {
                io.to(user?.socketId).emit("callDeclined", {msg: `${declinerName} declined your call!`})
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("acceptCall", ({callerId, acceptName}) => {
            const user = getUser(callerId)
            try {
                io.to(user?.socketId).emit("callAccepted", {acceptName: acceptName, status: true})
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("disconnect", () => {
            const roomID = socketToRoom[socket.id];
            let room = userss[roomID];
            removeUser(socket.id)
            io.emit('getUsers', users)

            if (room) {
                room = room.filter(id => id !== socket.id);
                userss[roomID] = room;
            }
        })

        socket.on("logout", (userId) => {
            removeUser2(userId)
            io.emit('getUsers', users)
        })

        /*******For video chat */

        socket.on("join room", roomID => {
            if (userss[roomID]) {
                const length = userss[roomID].length;
                if (length === 4) {
                    socket.emit("room full");
                    return;
                }
                userss[roomID].push(socket.id);
            } else {
                userss[roomID] = [socket.id];
            }
            socketToRoom[socket.id] = roomID;
            const usersInThisRoom = userss[roomID].filter(id => id !== socket.id);

            socket.emit("all users", usersInThisRoom);
        });

        socket.on("sending signal", payload => {
            io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        });

        socket.on("returning signal", payload => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        });

        /********for notif */




    })
}
