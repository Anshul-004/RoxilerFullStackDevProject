import dotenv from 'dotenv'
import {connectDB} from './db/connectDB.js'
import app from './app.js';

dotenv.config({path:'./.env'})
const port = process.env.PORT || 4000;

try {
    await connectDB()
    .then(
        app.listen(port, ()=>{
            console.log("Express App Listening on Port ",port);
        })
    )
} catch (error) {
    console.log("Error in DB Connection",error)
    process.exit(1);
}
