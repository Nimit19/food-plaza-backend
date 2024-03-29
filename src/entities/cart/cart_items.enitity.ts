import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base.entity";
import { Carts } from "./carts.enitity";
import { FoodItems } from "../food_items.enitity";

@Entity({ name: "cart_items" })
export class CartItems extends Base {
  @Column({ name: "quantity" })
  quantity: number;

  @ManyToOne(() => Carts, (carts) => carts.cartItems, { onDelete: "SET NULL" })
  @JoinColumn({
    name: "cart_id",
  })
  carts: Carts;

  @ManyToOne(() => FoodItems, (foodItems) => foodItems.cartItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "food_item_id",
  })
  foodItems: FoodItems;
}
