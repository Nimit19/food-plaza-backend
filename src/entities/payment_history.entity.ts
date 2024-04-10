import {
  Column,
  Double,
  Entity,
  JoinColumn,
  OneToOne,
  Timestamp,
} from "typeorm";
import { Base } from "./base.entity";
import { PaymentMethod, PaymentStatus } from "../constants";
import { Orders } from "./order/orders.entity";

@Entity({ name: "payment_history" })
export class PaymentHistory extends Base {
  @Column({ name: "payment_method", type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ name: "amount", type: "double precision" })
  amount: number;

  @Column({ name: "amount_due", type: "double precision" })
  amountDue: number;

  @Column({ name: "amount_paid", type: "double precision" })
  amountPaid: number;

  @Column({ name: "transaction_id", type: "double precision" })
  transactionId: string;

  @Column({ name: "transaction_at", type: "timestamp" })
  transactionAt: Date;

  @Column({ name: "cancelled_at", type: "timestamp" })
  cancelledAt: Date;

  @Column({ name: "status", type: "enum", enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @OneToOne(() => Orders)
  @JoinColumn({ name: "order_id" })
  orders: Orders;
}
