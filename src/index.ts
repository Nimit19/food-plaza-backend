import express from "express";
import { AppDataSource } from "./data-source";
import { PORT } from "./config";

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () =>
      console.log(`Server started: http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
