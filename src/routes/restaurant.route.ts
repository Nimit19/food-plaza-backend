import express from "express";
import { addRestaurantDetails, getAllRestaurants } from "../controllers";

const router = express.Router();

router.route("/").get(getAllRestaurants).post(addRestaurantDetails);

export { router as restaurantRoute };
