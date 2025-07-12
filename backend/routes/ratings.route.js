import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { addRating, avgRating } from "../controllers/ratings.controller.js";

const router = Router();

//get avg rating
router.route('/averageRating').post(avgRating)
//protected rout
router.route('/addRating').post(verifyToken,addRating)


export default router;