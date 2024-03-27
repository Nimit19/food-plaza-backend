import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CartItems, Carts, FoodItems } from "../entities";

export const addFoodItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId, foodItemId } = req.body;

    const cartsRepository = AppDataSource.getRepository(Carts);
    const cartItemsRepository = AppDataSource.getRepository(CartItems);
    const foodItemsRepository = AppDataSource.getRepository(FoodItems);

    // Find the cart
    const cart = await cartsRepository.findOne({
      where: {
        id: cartId,
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the food item
    const foodItem = await foodItemsRepository.findOne({
      where: { id: foodItemId },
    });

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const cartItem = await cartItemsRepository.findOne({
      where: {
        carts: { id: cart.id },
        foodItems: { id: foodItem.id },
      },
      relations: {
        carts: true,
        foodItems: true,
      },
    });

    if (!cartItem) {
      let newCartItem = new CartItems();
      newCartItem.foodItems = foodItem;
      newCartItem.quantity = 1;
      newCartItem.carts = cart;

      const addedNewCartItem = await cartItemsRepository.save(newCartItem);

      return res.status(200).json(addedNewCartItem);
    }

    cartItem.quantity++;
    await cartItemsRepository.save(cartItem);

    res.status(200).json({ cartItem, message: "Food item added to cart" });
  } catch (error) {
    console.error("Error adding food item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFoodItemfromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, foodItemId } = req.body;

    const cartsRepository = AppDataSource.getRepository(Carts);
    const cartItemsRepository = AppDataSource.getRepository(CartItems);
    const foodItemsRepository = AppDataSource.getRepository(FoodItems);

    // Find the cart
    const cart = await cartsRepository.findOne({
      where: {
        id: cartId,
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the food item
    const foodItem = await foodItemsRepository.findOne({
      where: { id: foodItemId },
    });

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const cartItem = await cartItemsRepository.findOne({
      where: {
        carts: { id: cart.id },
        foodItems: { id: foodItem.id },
      },
      relations: {
        carts: true,
        foodItems: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      const removedItem = await cartItemsRepository.save(cartItem);
      res
        .status(200)
        .json({ removedItem, message: "Food item removed from cart" });
    } else {
      const removedItem = await cartItemsRepository.remove(cartItem);
      res
        .status(200)
        .json({ removedItem, message: "Food item removed from cart" });
    }
  } catch (error) {
    console.error("Error removing food item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(404).json({ message: "User not found" });
  const cartsRepository = AppDataSource.getRepository(Carts);

  const cart = await cartsRepository.findOne({
    where: {
      users: {
        id: user._id,
      },
    },
    relations: {
      cartItems: {
        foodItems: true,
      },
    },
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.status(404).json({ cart, message: "Get cart Successfully" });
};
