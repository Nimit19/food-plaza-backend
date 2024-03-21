import "reflect-metadata";
import { DataSource } from "typeorm";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || "5432"),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: ["./src/entities/*{.ts,.js}"],
  synchronize: false,
  migrations: ["./src/migrations/*{.ts,.js}"],
  logging: ["query", "error"],
});
