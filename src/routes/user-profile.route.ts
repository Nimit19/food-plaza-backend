import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers";

const router = express.Router();

router.route("/").get(getUserProfile).patch(updateUserProfile);

export { router as userProfileRoute };
