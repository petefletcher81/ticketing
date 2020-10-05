import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body } from "express-validator";

import { BadRequestError } from "../errors/bad-request-error";
import { validationRequest } from "../middlewares/validate-request";
import jwt from "jsonwebtoken";
// create a router to set up routes
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // checks mongoose model for existing
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    // this just builds the user payload
    const user = User.build({
      email,
      password,
    });
    // save to db
    await user.save();
    // generate jwt and store on session object
    // we defined the the env var --> addin ! tells TS we have checked this
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.jwt_key!
    );

    // TS wants us to recreate the object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

// export and rename --> going to have many routers so need to rename each
export { router as signupRouter };
