import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN
    }
));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())


//From Here Onwards we'll redirect the users to Routes files 
import userRoute from './routes/user.route.js'

app.use('/api/user', userRoute);

export default app;