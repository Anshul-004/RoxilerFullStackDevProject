import { Router } from "express";
import { logoutUser, loginUser, registerUser, testRoute } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/test').post(testRoute)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//Protected Routes
router.route('/logout').post(verifyToken,logoutUser)

export default router;