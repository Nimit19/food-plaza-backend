import {
  Column,
  Double,
  Entity,
  JoinColumn,
  OneToOne,
  Timestamp,
} from "typeorm";
import { Base } from "../base/base.entity";
import { PaymentMethod, PaymentStatus } from "../../constants";
import { Orders } from "../order/orders.enitity";

@Entity({ name: "payment_history" })
export class PaymentHistory extends Base {
  @Column({ name: "payment_method", type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ name: "amount", type: "double precision" })
  amount: number;

  @Column({ name: "payable_amount", type: "double precision" })
  payableAmount: Double;

  @Column({ name: "transaction_at", type: "timestamp" })
  transactionAt: Timestamp;

  @Column({ name: "status", type: "enum", enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @OneToOne(() => Orders)
  @JoinColumn()
  orders: Orders;
}
