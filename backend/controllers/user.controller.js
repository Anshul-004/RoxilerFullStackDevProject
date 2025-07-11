import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPool } from "../db/connectDB.js";
import bcrypt from 'bcryptjs'


const testRoute = asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponse(200,{},"Test Route Works Well"))
})

const registerUser = asyncHandler(async(req,res)=>{
    
    const {email, address, name, password} = req.body;
    const role = 'user';
    if(!email || !address || !name || !password){
        throw new ApiError(400,"All Fields Are Required.")
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    try{
        const pool = getPool();

        if(!pool){
            throw new ApiError(500,"Database Pool Not Available.")
        }

        //check existing users
        const[existingUser] = await pool.query('SELECT email,name FROM users WHERE email = ?',[email])

        if(existingUser.length > 0){
            console.log(existingUser)
            throw new ApiError(400, "User Already Exists")
        }

        //enter if not - Insert with all required columns including role

        const [result] = await pool.query(
            'INSERT INTO users (name, address, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [name, address, email, hashedPassword, role]
        );
        
        // console.log("Insert result:", result);
        
        //get the new user
        const[newUser] = await pool.query('SELECT id,name,email,address,role,created_at FROM users WHERE id=?',[result.insertId])

        return res.status(201)
        .json(new ApiResponse(201, newUser[0], "User Created Successfully"))
        
    }catch(error){
        console.log("Error Occured",error);
        throw new ApiError(500,"Something Went Wrong With Database.")
    }
})

export {testRoute, registerUser}