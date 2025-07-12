import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { addRating } from "../controllers/ratings.controller.js";

const router = Router();

//protected rout
router.route('/addRating').post(verifyToken,addRating)


export default router;