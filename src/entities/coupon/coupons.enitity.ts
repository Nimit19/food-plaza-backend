import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";
import { CouponsType } from "../../constants";

@Entity({ name: "coupons" })
export class Coupons extends Base {
  @Column({ type: "enum", enum: CouponsType })
  couponType: CouponsType;

  @Column({})
  discount: Double;

  @Column({})
  couponCode: string;

  @Column({})
  expiryDate: Date;
}
