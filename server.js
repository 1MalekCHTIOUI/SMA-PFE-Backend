const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000;
const path = require("path");
const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/users");
const roomRouter = require("./Routes/rooms");
const messageRouter = require("./Routes/messages");
const notificationRouter = require("./Routes/notifications");
const uploadRouter = require("./Routes/upload");
const postRouter = require("./Routes/post");
// const server = http.createServer(app)
const { v4 } = require("uuid");
const multer = require("multer");
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// })
// const socketLogic = require('./Socket/SocketLogic')(io)
const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/sma";
const REMOTE_MONGO_URI = process.env.MONGO_URI;
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
app.use(cors());
// app.use(multer({ dest: "./public/uploads/" }).single("file"));
app.options("*", cors());
app.use(express.json());
app.set("view engine", "ejs");

app.get("/getLink", (req, res, next) => {
  res.send(v4());
});

mongoose
  .connect(REMOTE_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log("MongoDB Not Connected"));
app.use("/public/uploads", express.static("./public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/messages", messageRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
