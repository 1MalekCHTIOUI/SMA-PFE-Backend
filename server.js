const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const path = require('path')
const mainRouter = require('./Routes');
require("dotenv").config({ path: path.resolve(__dirname, './.env') })
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.set("view engine", "ejs");


mongoose.connect("mongodb://127.0.0.1:27017/sma", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB has been connected"))
.catch((err) => console.log("MongoDB Not Connected"))

app.use('/api', mainRouter);

app.listen(PORT, () =>{
    console.log("Server is running on Port: " + PORT);
})