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
import authRoute from './routes/auth.route.js'
import shopRoute from './routes/shop.route.js'
import ratingsRoute from './routes/ratings.route.js'
import adminRoute from './routes/admin.route.js'

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/shop', shopRoute)
app.use('/api/rating', ratingsRoute)
app.use('/api/admin', adminRoute)

export default app;