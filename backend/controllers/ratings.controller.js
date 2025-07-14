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
        
        // Check if user has already rated this specific shop
        const [pRate] = await pool.query('SELECT * FROM ratings WHERE user_id=? AND store_id=?',[id, shopId]);

        if(pRate.length > 0){
            // Update rating if already exists for this shop
            const [updRate] = await pool.query('UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?',[rating,id,shopId])
            
            const [updVals] = await pool.query('SELECT user_id, store_id, rating FROM ratings WHERE id=?',[pRate[0].id]);
            
            return res.status(200)
            .json(new ApiResponse(200,updVals[0],"Rating Updated Successfully"));
        }

        // Create new rating
        const [nRate] = await pool.query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?)',[id,shopId,rating]);

        const [newRating] = await pool.query('SELECT user_id, store_id, rating FROM ratings WHERE id=?',[nRate.insertId])

        return res.status(200)
        .json(new ApiResponse(200,newRating[0],"Rated Shop Successfully"))

    } catch (error) {
        console.log("Error : ",error);
        throw new ApiError(500, "Can't Register Your Rating.")
    }
})

const avgRating = asyncHandler(async(req,res)=>{
    const {shopId} = req.body;
    if(!shopId){
        throw new ApiError(400,"Shop Id is required")
    }

    try {
        const pool = getPool();
        const [averageRate] = await pool.query('SELECT store_id, ROUND(AVG(rating),1) AS avg FROM ratings WHERE store_id=? GROUP BY store_id',[shopId])

        if(averageRate.length === 0){
            // No ratings exist for this shop, return default values
            return res.status(200)
            .json(new ApiResponse(200, {store_id: shopId, avg: 0}, "No ratings found for this shop"))
        }

        return res.status(200)
        .json(new ApiResponse(200,averageRate[0],"Got Averages"))
        
    } catch (error) {
        console.log("Error : ",error);
        throw new ApiError(500, "Can't Get Avg Ratings")
    }
})

export {addRating, avgRating}