import { Router } from "express";
import { loginUser, registerUser, testRoute } from "../controllers/user.controller.js";

const router = Router();

router.route('/test').post(testRoute)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router;