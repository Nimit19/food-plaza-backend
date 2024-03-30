import express from "express";
import { userLogInHandler, userSignUpHandler } from "../controllers";

const router = express.Router();

router.post("/login", userLogInHandler);
router.post("/signup", userSignUpHandler);

export { router as authRoute };
