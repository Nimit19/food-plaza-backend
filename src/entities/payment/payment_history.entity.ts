import { Column, Double, Entity, Timestamp } from "typeorm";
import { Base } from "../base/base.entity";
import { PaymentMethod, PaymentStatus } from "../../constants";

@Entity({ name: "payment_history" })
export class PaymentHistory extends Base {
  @Column({ type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({})
  amount: Double;

  @Column({})
  payableAmount: Double;

  @Column({})
  transactionAt: Timestamp;

  @Column({ type: "enum", enum: PaymentStatus })
  paymentStatus: PaymentStatus;
}
