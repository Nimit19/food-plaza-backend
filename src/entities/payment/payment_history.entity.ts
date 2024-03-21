import { Column, Double, Entity, Timestamp } from "typeorm";
import { Base } from "../base/base.entity";
import { PaymentMethod, PaymentStatus } from "../../constants";

@Entity({ name: "payment_history" })
export class PaymentHistory extends Base {
  @Column({ name: "payment_method", type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ name: "amount" })
  amount: Double;

  @Column({ name: "payable_amount" })
  payableAmount: Double;

  @Column({ name: "transaction_at" })
  transactionAt: Timestamp;

  @Column({ name: "status", type: "enum", enum: PaymentStatus })
  paymentStatus: PaymentStatus;
}
