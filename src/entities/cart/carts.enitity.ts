import { Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "carts" })
export class Carts extends Base {}
