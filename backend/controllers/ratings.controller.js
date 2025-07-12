import { getPool } from "../db/connectDB.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addRating = asyncHandler(async(req,res)=>{
    const{rating, shopId} = req.body;
    const{id, email, name} = req.user;

    if(!rating || !email || !name || !id || !shopId){
        throw new ApiError(400, "Rating is Required & You must be signed in");
    }

    try {
        const pool = getPool();
        
        const [pRate] = await pool.query('SELECT * FROM ratings WHERE user_id=?',[id]);

        if(pRate.length>0){
            //Update rating if already exists
            const [updRate] = await pool.query('UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?',[rating,id,shopId])
            // console.log(pRate[0]);
            const [updVals] = await pool.query('SELECT user_id, store_id, rating FROM ratings WHERE id=?',[pRate[0].id]);
            // console.log(updVals);
            return res.status(204);
        }

        const [nRate] = await pool.query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?)',[id,shopId,rating]);

        const [newRating] = await pool.query('SELECT user_id, store_id, rating FROM ratings WHERE id=?',[nRate.insertId])

        return res.status(200)
        .json(new ApiResponse(200,newRating[0],"Rated Shop Successfully"))

    } catch (error) {
        console.log("Error : ",error);
        throw new ApiError(500, "Can't Register Your Rating.")
    }
})

export {addRating}