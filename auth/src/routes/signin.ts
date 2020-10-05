import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Password } from "../services/password";
import { validationRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

// create a router to set up routes
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // whenever dealing with auth - better to share little info
      // the more info with give -- could be going to malicious user
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // generate jwt and store on session object
    // we defined the the env var --> addin ! tells TS we have checked this
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.jwt_key!
    );

    // TS wants us to recreate the object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

// export and rename --> going to have many routers so need to rename each
export { router as signinRouter };
