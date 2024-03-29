import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Base } from "../base.entity";
import { Orders } from "./orders.enitity";
import { CartItems } from "../cart/cart_items.enitity";

@Entity({ name: "order_items" })
export class OrderItems extends Base {
  @Column({ name: "amount", type: "double precision" })
  amount: number;

  @ManyToOne(() => Orders, (orders) => orders.orderItems, { cascade: true })
  @JoinColumn({ name: "order_id" })
  orders: Orders;

  @OneToOne(() => CartItems)
  @JoinColumn({ name: "cart_item_id" })
  cartItems: CartItems;
}
