import { CartItems } from "../entities";

export const orderItemData = (items: CartItems[]) => {
  const orderItem = items.map((item) => {
    return {
      quantity: item.quantity,
      restaurantId: item.foodItems.restaurants.id,
      restaurantName: item.foodItems.restaurants.shopName,
      foodId: item.foodItems.id,
      foodName: item.foodItems.foodName,
      foodDescription: item.foodItems.foodDescription,
      foodImageUrl: item.foodItems.foodImageUrl,
      foodPrice: item.foodItems.price,
      foodCategory: item.foodItems.restaurantFoodCategories.foodCategoryName,
    };
  });
  return orderItem;
};
