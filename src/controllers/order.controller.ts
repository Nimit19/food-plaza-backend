import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CartItems, Carts, Coupons, Orders, Users } from "../entities";
import { OrderStatus } from "../constants";

export const orderAllCartItem = async (req: Request, res: Response) => {
  try {
    const authUser = req.user;
    const { couponId } = req.body;

    const couponsRepository = AppDataSource.getRepository(Coupons);
    const foundCoupon = await couponsRepository.findOne({
      where: { id: couponId },
    });

    if (!foundCoupon) {
      return res.status(404).json({ msg: "Not Found Coupon" });
    }

    if (!authUser) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Unable to verify User" });
    }

    const usersRepository = AppDataSource.getRepository(Users);
    const cartsRepository = AppDataSource.getRepository(Carts);
    const cartItemsRepo = AppDataSource.getRepository(CartItems);

    const user = await usersRepository.findOne({ where: { id: authUser._id } });

    const cart = await cartsRepository.findOne({
      where: {
        users: {
          id: authUser._id,
        },
      },
      relations: ["cartItems"], // Ensure to load cartItems relation
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await cartItemsRepo.find({
      where: {
        carts: {
          id: cart.id,
        },
      },
      relations: {
        foodItems: true,
      },
    });
    let newOrder = new Orders();
    let totalAmount: number = 0;
    let toPay: number = 0;

    for (const cartItem of cartItems) {
      totalAmount += cartItem.foodItems.price * cartItem.quantity;
    }

    if (foundCoupon) {
      toPay = totalAmount - foundCoupon.discount;
    } else {
      toPay = totalAmount;
    }

    // newOrder.date = new Date();
    newOrder.orderStatus = OrderStatus.PENDING;
    newOrder.users = user!;
    newOrder.orderData = {
      orderItems: cartItems,
      totalAmount: totalAmount,
      discount: foundCoupon.discount,
      toPay: toPay,
      deliveryCharge: "Free Delivery",
    };

    if (foundCoupon) {
      newOrder.coupons = foundCoupon;
    }

    const orderRepo = AppDataSource.getRepository(Orders);

    // Save order and order items
    await orderRepo.save(newOrder);

    // Delete cart items after order
    await cartItemsRepo.remove(cart.cartItems);

    res.status(200).json({ message: "All cart items ordered successfully." });
  } catch (error) {
    console.error("Error ordering all cart items:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const orderOneCartItem = async (req: Request, res: Response) => {
  try {
    const authUser = req.user;

    const { couponId, cartItemId } = req.body;

    const couponsRepository = AppDataSource.getRepository(Coupons);

    const foundCoupon = await couponsRepository.findOne({
      where: { id: couponId },
    });

    if (!foundCoupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }

    if (!authUser) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Unable to verify User" });
    }

    const usersRepository = AppDataSource.getRepository(Users);
    const cartItemsRepository = AppDataSource.getRepository(CartItems);

    const user = await usersRepository.findOne({ where: { id: authUser._id } });
    const cartItem = await cartItemsRepository.findOne({
      where: { id: +cartItemId },
      relations: {
        foodItems: true,
      },
    });

    if (!cartItem) {
      return res.json({ message: "not Found" });
    }

    let newOrder = new Orders();

    let totalAmount = cartItem.quantity * cartItem.foodItems.price;
    let toPay = totalAmount;

    if (foundCoupon) {
      toPay -= foundCoupon.discount;
    }

    // newOrder.date = new Date();
    newOrder.orderStatus = OrderStatus.PENDING;
    newOrder.users = user!;
    newOrder.orderData = {
      orderItems: cartItem,
      totalAmount: totalAmount,
      discount: foundCoupon.discount,
      toPay: toPay,
      deliveryCharge: "Free Delivery",
    };

    if (foundCoupon) {
      newOrder.coupons = foundCoupon;
    }

    const orderRepo = AppDataSource.getRepository(Orders);
    const createdOrder = await orderRepo.save(newOrder);

    // Delete the Cart Item After Order

    await AppDataSource.getRepository(CartItems).delete({ id: cartItem.id });

    res
      .status(200)
      .json({ createdOrder, message: "Cart item ordered successfully." });
  } catch (error) {
    console.error("Error ordering one cart item:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const ordersRepository = AppDataSource.getRepository(Orders);
    const orders = await ordersRepository.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const ordersRepository = AppDataSource.getRepository(Orders);
    const order = await ordersRepository.findOne({ where: { id: +orderId } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};
