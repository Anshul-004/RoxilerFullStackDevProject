import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getAllShops, registerShop } from "../controllers/shop.controller.js";


const router = Router();

router.route('/getShops').get(getAllShops)

//secured Routes
router.route('/register').post(verifyToken,registerShop)

export default router;