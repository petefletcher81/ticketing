import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// traffic will be proxied through nginx
// express will set this and not trust it by default
app.set("trust proxy", true);
app.use(json());
// disable encryption
// JWT is already tamper resistent
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  // express-async-errors package helps us stop the req handing
  // we also dont have to pass the request to next
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  // best place to check the env vars
  if (!process.env.jwt_key) {
    throw new Error("jwt_key must be defined");
  }
  // within the mongo depl -- find the service name to connect to
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongo db");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Listening on 3000!!");
  });
};

start();
