import { Router } from "express";
import { registerUser, testRoute } from "../controllers/user.controller.js";

const router = Router();

router.route('/test').post(testRoute)
router.route('/register').post(registerUser)

export default router;