import { getPool } from "../db/connectDB.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerShop = asyncHandler(async(req,res)=>{
    const {shopName, shopAddress} = req.body;
    const {email, id} = req.user;
    if(!email || !id){
        throw new ApiError(400, "You must login first");
    }

    if(!shopName || !shopAddress){
        throw new ApiError(400, "Shop Name & Address is Required")
    }


    try {
        const pool = getPool();

        const [existingShop] = await pool.query('SELECT name,address FROM stores WHERE email=?',[email])

        if(existingShop.length>0){
            throw new ApiError(400, "Shop Already Exists")
        }

        //No Shop Exists, hence create one.
        const [result] = await pool.query('INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',[shopName,email,shopAddress,id]);

        console.log("Shop Created",result);

        const [newShop] = await pool.query('SELECT name,email,address FROM stores WHERE id=?',[result.insertId])

        return res.status(201)
        .json(new ApiResponse(201,newShop[0],"Shop Created"))

        
    } catch (error) {
        console.error("Error : ",error);
        throw new ApiError(500, "Something Went wrong while registering shop")
    }
})

export {registerShop}