import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CartItems, Carts, Coupons, Orders, Users } from "../entities";
import { OrderState } from "../constants";
import { orderItemData } from "../services";
import { orderDetailsInput } from "../dto";

export const orderAllCartItem = async (req: Request, res: Response) => {
  try {
    const authUser = req.user;

    let { couponId } = req.query;

    if (!authUser) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Unable to verify User" });
    }
    const couponsRepository = AppDataSource.getRepository(Coupons);

    let foundCoupon: Coupons | undefined | null;

    if (!couponId) {
      foundCoupon = await couponsRepository.findOne({
        where: { id: +couponId! },
      });
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
      relations: ["cartItems"],
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
        foodItems: {
          restaurants: true,
          restaurantFoodCategories: true,
        },
      },
    });

    let newOrder = new Orders();
    let totalAmount: number = 0;
    let toPay: number = 0;

    for (const cartItem of cartItems) {
      totalAmount += cartItem.foodItems.price * cartItem.quantity;
    }

    let discount;
    if (foundCoupon) {
      toPay = totalAmount - foundCoupon.discount;
      discount = foundCoupon.discount;
    } else {
      toPay = totalAmount;
      discount = 0;
    }

    // Set order details
    newOrder.orderStatus = OrderState.PREPARING;
    newOrder.users = user!;
    newOrder.orderDetails = {
      orderItems: orderItemData(cartItems),
      totalAmount: totalAmount,
      discount: discount,
      toPay: toPay,
      deliveryCharge: "Free Delivery",
    };

    if (foundCoupon) {
      newOrder.coupons = foundCoupon;
    }

    const orderRepo = AppDataSource.getRepository(Orders);

    // Save order and order items
    const orderData = await orderRepo.save(newOrder);

    // Delete cart items after order
    await cartItemsRepo.remove(cart.cartItems);

    res.status(200).json(orderData);
  } catch (error) {
    console.error("Error ordering all cart items:", error);
    res.status(500).send({ message: "Internal Server Error" });
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
        foodItems: {
          restaurants: true,
          restaurantFoodCategories: true,
        },
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
    newOrder.orderStatus = OrderState.PREPARING;
    newOrder.users = user!;
    newOrder.orderDetails = <orderDetailsInput>{
      orderItems: orderItemData([cartItem]),
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

export const getOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user!;

    const ordersRepository = AppDataSource.getRepository(Orders);
    const orders = await ordersRepository.find({
      where: {
        users: {
          id: _id,
        },
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
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
