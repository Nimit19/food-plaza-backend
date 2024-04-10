export type orderDetailsInput = {
  orderItems: orderItemInput[];
  totalAmount: number;
  discount: number;
  toPay: number;
  deliveryCharge: string;
};

export type orderItemInput = {
  quantity: number;
  restaurantId: number;
  restaurantName: string;
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodImageUrl: string;
  foodPrice: number;
  foodCategory: string;
};
