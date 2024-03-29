import express from "express";
import {} from "../controllers";
import {
  getAllOrders,
  getOrderById,
  orderAllCartItem,
  orderOneCartItem,
} from "../controllers/order.controller";

const router = express.Router();
router.route("/").post(orderAllCartItem);
router.route("/:id").post(orderOneCartItem);
router.route("/:id").get(getOrderById);
router.route("/").get(getAllOrders);
export { router as orderRoute };
