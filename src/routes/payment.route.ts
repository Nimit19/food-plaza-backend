import express from "express";
import { createPayment, updatePayment } from "../controllers";

const router = express.Router();

router.route("/").post(createPayment);
router.route("/").patch(updatePayment);

export { router as paymentRoute };
