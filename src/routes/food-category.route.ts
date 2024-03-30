import express from "express";
import {
  addFoodCategory,
  getFoodByCategory,
  getPopularCategories,
} from "../controllers";

const router = express.Router();

router.route("/").post(addFoodCategory);
router.route("/popular").get(getPopularCategories);
router.route("/popular/:id").get(getFoodByCategory);
export { router as foodCategoryRoute };
