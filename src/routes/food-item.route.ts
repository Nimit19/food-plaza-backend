import express from "express";
import {} from "../controllers";
import {
  addFoodItem,
  getFoodItemsByWeather,
  searchFoodItems,
} from "../controllers/food.controller";

const router = express.Router();

router.route("/").post(addFoodItem);
router.route("/weather").get(getFoodItemsByWeather);
router.route("/search").get(searchFoodItems);
export { router as foodItemRoute };
