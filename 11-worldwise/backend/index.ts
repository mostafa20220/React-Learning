require("dotenv").config();
import fs from "fs";
import path from "path";
import https from "https";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";

import { citiesRouter } from "./src/routers/cities.router";
import { AppError, createRes } from "./src/utils/helpers";
import { usersRouter } from "./src/routers/users.router";
import { authRouter } from "./src/routers/auth.router";


// const options = {
  // key: fs.readFileSync('localhost-key.pem'),
  // cert: fs.readFileSync('localhost.pem'),
// };

const app = express();

// const server = https.createServer(options, app);
const server = https.createServer(app);


// connect mongodb
(function connectMongoose() {
  const uri = process.env.MONGODB_CONNECTION_STRING;
  if (!uri) throw new Error("MongoDB Connection String Not Provided");
  mongoose
    .connect(uri)
    .then((_) => console.log("mongoose is connected successfully"))
    .catch((err) => console.error("db error: ", err));
})();

// Middlewares
app.use("/api/uploads", express.static(path.join(__dirname, "uploads"))); // use express static as middleware
app.use(express.json()); // use express bodyParser as middleware
app.use(cookieParser()); // use cookieParser as middleware
app.use(morgan("dev")); // use morgan as middleware
app.use(cors({ origin: "https://localhost:5173", credentials: true }));


// Routers
app.use("/api/cities", citiesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter); 

// Handling wrong routers
app.all("*", (req, res, next) => {
  res.status(404).json(createRes("fail", "Resource Not Available"));
  next();
});

// global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  fs.appendFileSync(
    "errors.log",
    new Date().toLocaleString() + "\t" + err.message + "\n",
  );
  // console.log(err);
  const code = err.code && err.code >= 100 && err.code < 600 ? err.code : 500;
  res
    .status(code)
    .json(createRes(err.statusText || "error", err.message,code));
});

// lunch the server
const port = process.env.PORT;
server.listen(port, () => {
  console.log("The Server is Listening on https://localhost:" + port);
});
