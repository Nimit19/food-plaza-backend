import express from "express";
import { getUserProfile, updateUserProfile } from "../../controllers";

const router = express.Router();

router.route("/:id").get(getUserProfile).patch(updateUserProfile);

export { router as userProfileRoute };
