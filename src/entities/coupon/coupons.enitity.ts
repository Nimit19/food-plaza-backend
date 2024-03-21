import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";
import { CouponsType } from "../../constants";

@Entity({ name: "coupons" })
export class Coupons extends Base {
  @Column({ type: "enum", enum: CouponsType, name: "coupon_type" })
  couponType: CouponsType;

  @Column({ name: "discount" })
  discount: Double;

  @Column({ name: "code" })
  couponCode: string;

  @Column({ name: "expiry_date" })
  expiryDate: Date;
}
