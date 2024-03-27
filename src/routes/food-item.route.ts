import express from "express";
import {} from "../controllers";
import {
  addFoodItem,
  getFoodItemsByTag,
  getFoodItemsByWeather,
  searchFoodItems,
} from "../controllers/food.controller";

const router = express.Router();

router.route("/").post(addFoodItem);
router.route("/weather").get(getFoodItemsByWeather);
router.route("/tag").get(getFoodItemsByTag);
router.route("/search").get(searchFoodItems);
export { router as foodItemRoute };
