const express = require('express')
const cookieparser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(
  cors({
    "credentials":true,
    "origin":"https://quiz-frontend-6nnkdqvt4-taruns-projects-20770b04.vercel.app",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "optionsSuccessStatus": 204
  })
);
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