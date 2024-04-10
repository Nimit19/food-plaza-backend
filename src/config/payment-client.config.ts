import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_Id!,
  key_secret: process.env.RAZORPAY_KEY!,
});
