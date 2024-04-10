import express from "express";
import {
  addFoodItemToCart,
  deleteFoodItemFromCart,
  getCart,
  getCartItem,
  getCartQuantity,
  removeFoodItemFromCart,
} from "../controllers";

const router = express.Router();

router
  .route("/")
  .post(addFoodItemToCart)
  .patch(removeFoodItemFromCart)
  .delete(deleteFoodItemFromCart);
router.get("/", getCart);
router.get("/cart-item", getCartItem);
router.get("/cart-quantity", getCartQuantity);

export { router as cartRoute };
