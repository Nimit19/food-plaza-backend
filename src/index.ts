import express, { Express } from "express";
import { AppDataSource } from "./data-source";
import { PORT } from "./config";
import {
  authRoute,
  cartRoute,
  foodCategoryRoute,
  foodItemRoute,
  orderRoute,
  restaurantRoute,
  userProfileRoute,
} from "./routes";
import { hasCart } from "./middlewares/cart.middleware";
import { authentication } from "./middlewares/authenticate.middleware";

const app: Express = express();

// BuiltIn Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/user-profile", userProfileRoute);
app.use("/restaurant", restaurantRoute);
app.use("/food-category", foodCategoryRoute);
app.use("/food-item", foodItemRoute);

app.use(authentication);
app.use("/cart", hasCart, cartRoute);
app.use("/order", orderRoute);

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
