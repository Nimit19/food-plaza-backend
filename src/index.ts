import express, { Express } from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import session from "express-session";

import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

import {
  authRoute,
  cartRoute,
  couponRoute,
  foodCategoryRoute,
  foodItemRoute,
  orderRoute,
  paymentRoute,
  restaurantRoute,
  userProfileRoute,
} from "./routes";
import { hasCart } from "./middlewares/cart.middleware";
import { authentication } from "./middlewares/authenticate.middleware";

const app: Express = express();

// BuiltIn Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "Nimit",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/auth", authRoute);
app.use("/restaurant", restaurantRoute);
app.use("/food-category", foodCategoryRoute);
app.use("/food-item", foodItemRoute);

app.use(authentication);
app.use("/user-profile", userProfileRoute);
app.use("/cart", hasCart, cartRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/coupon", couponRoute);

AppDataSource.initialize()
  .then(() => {
    console.clear();
    console.log("Database Connected Successfully");
    app.listen(PORT, () =>
      console.log(`Server started: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
