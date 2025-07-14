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

        const [updatedUserRole] = await pool.query('UPDATE users SET role = "store_owner" WHERE id = ?',[id]);
        //JWT Token tobe refreshed and sent again to client when user's meta data changes.

        const [newShop] = await pool.query('SELECT name,email,address FROM stores WHERE id=?',[result.insertId])

        return res.status(201)
        .json(new ApiResponse(201,newShop[0],"Shop Created"))

        
    } catch (error) {
        console.error("Error : ",error);
        throw new ApiError(500, "Something Went wrong while registering shop")
    }
})

const getAllShops = asyncHandler(async(req,res)=>{
    try {

        const pool = getPool()
        const [allShops] = await pool.query('SELECT * FROM stores');

        return res.status(200)
        .json(new ApiResponse(200, [allShops], "These Are Onboarded Shops"))
        
    } catch (error) {
        
    }
})

const getUserShopsAndRatings = asyncHandler(async(req,res)=>{
    const {id} = req.user;
    if(!id){
        throw new ApiError(400,"You Must Be Logged In")
    }

    const pool = getPool();
    const [shop] = await pool.query('SELECT id,name FROM stores WHERE owner_id = ?',[id]);
    
    if(shop.length<=0){
        throw new ApiError(404, "No Such Shop Found")
    }

    const shopName = shop[0].name

    //Who all rated it?
    const [shopRaters] = await pool.query('SELECT u.name, r.rating FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id = ?',[shop[0].id])

    return res.status(200)
    .json(new ApiResponse(200,{shopName,shopRaters},"This is the user's shop"))

})

export {registerShop, getAllShops, getUserShopsAndRatings}