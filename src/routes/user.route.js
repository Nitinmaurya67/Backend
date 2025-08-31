import { Router } from "express";
import { resiterUser } from "../controllers/user.controller.js";

const router =Router();
router.route("/register").post(resiterUser);

export default router; 