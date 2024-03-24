import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Base } from "../base.entity";
import { OrderStatus } from "../../constants";
import { Users } from "../users.entity";
import { OrderItems } from "./order_items.entity";
import { Coupons } from "../coupons.enitity";

@Entity({ name: "orders" })
export class Orders extends Base {
  @Column({ name: "total_amount", type: "double precision" })
  totalAmount: number;

  @Column({ name: "to_pay", type: "double precision" })
  toPay: number;

  @Column({ name: "date" })
  date: Date;

  @Column({ name: "order_status", type: "enum", enum: OrderStatus })
  orderStatus: OrderStatus;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.orders)
  orderItems: OrderItems[];

  @OneToOne(() => Coupons)
  @JoinColumn()
  coupons: Coupons;
}
