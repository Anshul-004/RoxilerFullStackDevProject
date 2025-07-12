import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { registerShop } from "../controllers/shop.controller.js";


const router = Router();

//secured Routes
router.route('/register').post(verifyToken,registerShop)

export default router;