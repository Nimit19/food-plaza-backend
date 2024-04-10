import express from "express";
import { verifyCoupon } from "../controllers/coupon.controller";

const router = express.Router();

router.post("/verify", verifyCoupon);

export { router as couponRoute };
