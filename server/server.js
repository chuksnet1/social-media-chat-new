import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ChartRoute from '../server/Routes/ChatRoute.js'
import dotenv from 'dotenv'
import cors from 'cors';
import AuthRoute from '../server/Routes/AuthRouthe.js'
import UserRoute from '../server/Routes/UserRoute.js'
import PostRoute from '../server/Routes/PostRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import uploadRoute from './Routes/UploadRoute.js'



dotenv.config();
const Social_DB = process.env.APP_DB;
const PORT = process.env.PORT

const app = express();


//to serve images public to use
app.use(express.static('public'))
app.use('/images', express.static("images"))

//Middleware
app.use(express.static('public'))

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())


mongoose.connect(Social_DB)
    .then(() => app.listen(PORT, console.log(`listening at port ${PORT}`)))
    .catch((error) => console.log("this is the error: ",error))



//usage of route
app.use('/auth', AuthRoute);      //to go to this route we write  /route in google search
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/chat', ChartRoute);
app.use('/message', MessageRoute);
app.use('/upload', uploadRoute);