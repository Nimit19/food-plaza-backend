import express, { Express } from "express";
import { AppDataSource } from "./data-source";
import { PORT } from "./config";
import { authRoute, userProfileRoute } from "./routes";

const app: Express = express();

// BuiltIn Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/user-profile", userProfileRoute);
app.use("/restaurant");
app.use("/cart");
app.use("/order");

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () =>
      console.log(`Server started: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
