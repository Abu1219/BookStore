import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbUrl } from "./config.js";
import { Book } from "./Models.js";
import BookRoute from "./Routes/BooksRoute.js";
import cors from "cors";

const app = express();
// Middleware for parsing request body
app.use(express.json());

app.use(cors());
// Middleware for route
app.use("/books", BookRoute);

app.get("/", (request, response) => {
  return response.status(234).send("Welcome to Book Store");
});

app.listen(PORT, () => {
  console.log(`App is listening to port :${PORT}`);
});

// Middleware for handling cors policy

mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("App is connected to db");
  })
  .catch((error) => {
    console.log(error);
  });
