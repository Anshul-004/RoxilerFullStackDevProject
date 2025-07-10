import dotenv from 'dotenv'
import {connectDB} from './db/connectDB.js'

dotenv.config({path:'./.env'})

try {
    await connectDB()
} catch (error) {
    console.log("Error in DB Connection",error)
}
