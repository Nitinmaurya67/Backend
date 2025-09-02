import { Router } from "express";
import { resiterUser ,loginUser ,logoutUser} from "../controllers/user.controller.js";
import { upload} from "../middlewares/multer.middleware.js";
import { verify } from "jsonwebtoken";
const router =Router();
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }

    ]),
    resiterUser
);

router.route("/login").post(loginUser);


router.route("/logout").post( verifyJWT, logoutUser);
export default router; 