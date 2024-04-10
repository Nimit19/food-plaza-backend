import { Request, Response } from "express";
import { createOrUpdatePayment, generatePaymentLink } from "../services";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    const { paymentUrl, paymentId } = await generatePaymentLink(orderId);

    // const paymentHistory = await addPayment(orderId, paymentId);

    res.status(200).send({ paymentUrl, paymentId });
  } catch (err) {}
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { paymentUrlId, paymentId } = req.query;

    const paymentHistory = await createOrUpdatePayment(
      paymentUrlId!.toString(),
      paymentId!.toString()
    );

    res.status(200).send({ paymentHistory });
  } catch (err) {}
};
