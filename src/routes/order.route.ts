import express from "express";
import {} from "../controllers";
import {
  getOrderById,
  getOrdersOfUser,
  orderAllCartItem,
  orderOneCartItem,
} from "../controllers/order.controller";

const router = express.Router();
router.route("/").post(orderAllCartItem);
router.route("/:id").post(orderOneCartItem);
router.route("/:id").get(getOrderById);
router.route("/").get(getOrdersOfUser);
export { router as orderRoute };
