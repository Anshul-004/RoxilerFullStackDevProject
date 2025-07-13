import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getPool } from "../db/connectDB.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCounts = asyncHandler(async(req,res)=>{
    const {id,role} = req.user;

    if(!id || !role){
        throw new ApiError(400, "Sign In First.")
    }

    if(role != "admin"){
        throw new ApiError(403, "Users / ShopKeepers can't access admin routes")
    }

    try {
        const pool = getPool();

        const [uc] = await pool.query('SELECT COUNT(id) AS cnt FROM users')
        // console.log(uc)
        const userCount = uc[0].cnt;

        const [sc] = await pool.query('SELECT COUNT(id) AS cnt FROM stores')
        const storeCount = sc[0].cnt;

        const [rc] = await pool.query('SELECT COUNT(id) AS cnt FROM ratings')
        const ratingCount = rc[0].cnt;

        const counts = {userCount, storeCount, ratingCount}

        return res.status(200)
        .json(new ApiResponse(200, counts, "Got all counts"))

    } catch (error) {
        console.log("Error : ",error);
        throw new ApiError(500, "Can't get Counts, Database error ")
    }
})

const getusers = asyncHandler(async(req,res)=>{
    const {id,role} = req.user;

    if(!id || !role){
        throw new ApiError(400, "Sign In First.")
    }

    if(role != "admin"){
        throw new ApiError(403, "Users / ShopKeepers can't access admin routes")
    }

    try {
        const pool = getPool();

        const [users] = await pool.query('SELECT name, email, role FROM users')
        const userStats = users;

        const [stores] = await pool.query('SELECT s.name AS store_name, u.name AS owner_name, ROUND(AVG(r.rating), 2) AS avg_rating FROM stores s JOIN users u ON s.owner_id = u.id LEFT JOIN ratings r ON s.id = r.store_id GROUP BY s.id, s.name, u.name')
        const storeStats = stores;

        return res.status(200)
        .json(new ApiResponse(200,{userStats,storeStats},"Got all Lists"))
    } catch (error) {
        console.log("Error : ",error);
        throw new ApiError(500, "Can't get User's Info, Database error ")
    }
})


export {getCounts, getusers}