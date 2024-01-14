const express = require('express')
const cookieparser = require('cookie-parser');
const app = express();
// const fileUpload = require("express-fileupload");
app.use(cookieparser());

app.use(express.json());


const errorMiddleware = require('./middleware/error')

//route import
const notes= require('./routes/userRoute');
app.use("/api/v1",notes);


//middleware for error
app.use(errorMiddleware);
module.exports = app;