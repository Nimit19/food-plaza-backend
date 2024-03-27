import express from "express";
import {
  addRestaurantDetails,
  addRestaurantFoodCategory,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantCategories,
} from "../controllers";

const router = express.Router();

router.route("/").get(getAllRestaurants).post(addRestaurantDetails);
router
  .route("/restaurant-food-category")
  .get(getRestaurantCategories)
  .post(addRestaurantFoodCategory);

router.route("/:id").get(getRestaurantById);

export { router as restaurantRoute };
