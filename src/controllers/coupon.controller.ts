import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Coupons } from "../entities";

export const verifyCoupon = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    console.log("-------------------> ", code);
    const couponRepository = AppDataSource.getRepository(Coupons);

    const coupon = await couponRepository.findOne({
      where: { couponCode: code?.toString() },
    });

    res.status(200).json(coupon);
  } catch (error) {
    console.error("Error verifying coupon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
