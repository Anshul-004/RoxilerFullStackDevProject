import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { meRoute } from "../controllers/auth.controller.js";

const router = Router();

//Protected Routes
router.route('/me').get(verifyToken,meRoute)

export default router;