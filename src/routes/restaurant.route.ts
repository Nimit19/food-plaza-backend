import express from "express";
import {
  addRestaurantFoodCategory,
  createRestaurants,
  getAllRestaurants,
  getAllRestaurantsLogoAndName,
  getRestaurantById,
  getRestaurantCategories,
} from "../controllers";

const router = express.Router();

router.route("/").get(getAllRestaurants).post(createRestaurants);
router
  .route("/restaurant-food-category")
  .get(getRestaurantCategories)
  .post(addRestaurantFoodCategory);

router.route("/logo-name").get(getAllRestaurantsLogoAndName);

router.route("/:id").get(getRestaurantById);

export { router as restaurantRoute };
