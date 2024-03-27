import express from "express";
import { addFoodCategory } from "../controllers";

const router = express.Router();

router.route("/").post(addFoodCategory);
export { router as foodCategoryRoute };
