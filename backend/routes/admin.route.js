import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getCounts, getusers } from "../controllers/admin.controller.js";

const router = Router();

//protected Routes:
router.route('/getCounts').get(verifyToken,getCounts);
router.route('/getUsers').get(verifyToken,getusers)

export default router