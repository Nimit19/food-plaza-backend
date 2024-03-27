import express from "express";
import {
  addFoodItemToCart,
  getCartItems,
  removeFoodItemfromCart,
} from "../controllers";

const router = express.Router();

router
  .route("/")
  .post(addFoodItemToCart)
  .delete(removeFoodItemfromCart)
  .get(getCartItems);

export { router as cartRoute };
