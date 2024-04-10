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
      where: { id: +foodItemId },
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

    res.status(200).json({ message: "Food item added to cart" });
  } catch (error) {
    console.error("Error adding food item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFoodItemFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, foodItemId } = req.body;

    const cartsRepository = AppDataSource.getRepository(Carts);
    const cartItemsRepository = AppDataSource.getRepository(CartItems);
    const foodItemsRepository = AppDataSource.getRepository(FoodItems);

    // // Find the cart
    // const cart = await cartsRepository.findOne({
    //   where: {
    //     id: cartId,
    //   },
    // });

    // if (!cart) {
    //   return res.status(404).json({ message: "Cart not found" });
    // }

    // Find the food item
    const foodItem = await foodItemsRepository.findOne({
      where: { id: +foodItemId },
    });

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const cartItem = await cartItemsRepository.findOne({
      where: {
        carts: { id: cartId },
        foodItems: { id: foodItem.id },
      },
      relations: {
        carts: true,
        foodItems: true,
      },
    });

    if (!cartItem) {
      return res.status(200).json({ message: "Cart Item not found" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      const removedItem = await cartItemsRepository.save(cartItem);
      res.status(200).json(removedItem);
    } else {
      cartItem.quantity--;
      const removedItem = await cartItemsRepository.remove(cartItem);
      res.status(200).json(removedItem);
    }
  } catch (error) {
    console.error("Error removing food item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFoodItemFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, foodItemId } = req.body;

    const cartItemsRepository = AppDataSource.getRepository(CartItems);
    const foodItemsRepository = AppDataSource.getRepository(FoodItems);

    // Find the food item
    const foodItem = await foodItemsRepository.findOne({
      where: { id: +foodItemId },
    });

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const cartItem = await cartItemsRepository.findOne({
      where: {
        carts: { id: cartId },
        foodItems: { id: foodItem.id },
      },
      relations: {
        carts: true,
        foodItems: true,
      },
    });

    if (!cartItem) {
      return res.status(200).json({ message: "Cart Item not found" });
    }

    await cartItemsRepository.remove(cartItem);
    res.status(200).json({ message: "Food item removed from cart" });
  } catch (error) {
    console.error("Error removing food item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartItem = async (req: Request, res: Response) => {
  const user = req.user;
  const { foodItemId } = req.query;
  const { cartId } = req.body;

  if (!foodItemId) {
    return res.status(404).json({ message: "FoodItemId not found" });
  }

  if (!user) return res.status(404).json({ message: "User not found" });
  const cartItemsRepository = AppDataSource.getRepository(CartItems);

  const cartItem = await cartItemsRepository.findOne({
    where: {
      foodItems: {
        id: +foodItemId,
      },
      carts: {
        id: cartId,
      },
    },
  });

  console.log("CartItem --> ", cartItem);

  res.status(200).json(cartItem);
};

export const getCart = async (req: Request, res: Response) => {
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

  res.status(200).json(cart);
};

export const getCartQuantity = async (req: Request, res: Response) => {
  try {
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

    const cartQuantity = cart.cartItems.reduce(
      (
        prevState: {
          totalQuantity: number;
          totalAmount: number;
        },
        cartItem
      ) => {
        console.log(cartItem.quantity);
        console.log(cartItem.foodItems.price);
        console.log(cartItem.quantity + cartItem.foodItems.price);

        return {
          totalQuantity: prevState.totalQuantity + cartItem.quantity,
          totalAmount:
            prevState.totalAmount +
            cartItem.quantity * cartItem.foodItems.price,
        };
      },
      {
        totalQuantity: 0,
        totalAmount: 0,
      }
    );

    res.status(200).json(cartQuantity);
  } catch (err) {
    console.log(err);
  }
};

export const getCartTotalAmount = () => {};
