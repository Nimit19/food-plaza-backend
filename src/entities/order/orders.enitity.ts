import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";
import { OrderStatus } from "../../constants";

@Entity({ name: "orders" })
export class Orders extends Base {
  @Column({ name: "total_amount" })
  totalAmount: Double;

  @Column({ name: "to_pay" })
  toPay: Double;

  @Column({ name: "date" })
  date: Date;

  @Column({ name: "order_status", type: "enum", enum: OrderStatus })
  orderStatus: OrderStatus;
}
