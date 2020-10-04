import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { BadRequestError } from "../errors/bad-request-error";
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
  async (req: Request, res: Response) => {
    // look as req object
    const errors = validationResult(req);

    // check for errors
    if (!errors.isEmpty()) {
      // errors array - safely sends data back to user as an array within the json
      throw new RequestValidationError(errors.array());
    }

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

    res.status(201).send(user);
  }
);

// export and rename --> going to have many routers so need to rename each
export { router as signupRouter };
