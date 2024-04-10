import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { CouponsType } from "../constants";

@Entity({ name: "coupons" })
export class Coupons extends Base {
  @Column({ name: "isPercent" })
  isPercent: boolean;

  @Column({ name: "discount", type: "double precision" })
  discount: number;

  @Column({ name: "code" })
  couponCode: string;

  @Column({ name: "expiry_date" })
  expiryDate: Date;
}
