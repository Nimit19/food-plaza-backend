import { Column, Double, Entity, Geometry, Index, Point } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "restaurants" })
export class Restaurants extends Base {
  @Column({})
  shopName: string;

  @Column({})
  shopDiscription: string;

  @Column({})
  shopLogoUrl: string;

  @Column({})
  shopBg1: string;

  @Column({})
  shopBg2: string;

  @Column({})
  shopBg3: string;

  @Column({})
  menuPage1: string;

  @Column({})
  menuPage2: string;

  @Column({})
  isOpen: boolean;

  @Column({})
  openiningTime: string;

  @Column({})
  closingTime: string;

  @Column({})
  averageCost: string;

  @Column({})
  ratings: number;

  @Column({
    type: "geography",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column("jsonb", { nullable: true })
  address: Object[];
}

// const point: Point = {
//     type: "Point",
//     coordinates:[2.344]
// }
