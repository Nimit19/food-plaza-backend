import { Request, Response, NextFunction } from "express";
import { Carts, Users } from "../entities";
import { AppDataSource } from "../data-source";

export const hasCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUser = req.user;

  if (!authUser) {
    return res.status(401).json({ msg: "Unauthorized: Unable to verify User" });
  }

  const cartsRepository = AppDataSource.getRepository(Carts);
  const usersRepository = AppDataSource.getRepository(Users);

  try {
    const user = await usersRepository.findOne({ where: { id: authUser._id } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const foundCart = await cartsRepository.findOne({
      where: { users: { id: user.id } },
    });

    if (!foundCart) {
      const newCart = new Carts();
      newCart.users = user;
      const createdNewCart = await cartsRepository.save(newCart);
      if (req.body) req.body.cartId = createdNewCart.id;
    } else {
      if (req.body) req.body.cartId = foundCart.id;
    }

    next();
  } catch (error) {
    console.error("Error in hasCart middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
