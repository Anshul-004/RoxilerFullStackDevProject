import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'

dotenv.config({path:'./.env'})

try {
    connectDB()
} catch (error) {
    console.log("Error in DB COnnection",error)
}

// .then(() => {
//     app.on("error", (error) => {
//         console.log("Error Occured in Express App ", error);
//         throw error;
//     })
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Express App Listening on PORT : ${process.env.PORT}`)
//     })
// })
// .catch( (e) => {
//     console.error("DB Connection Error:", e);
//     process.exit(1);
// });