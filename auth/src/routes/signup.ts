import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
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
  (req: Request, res: Response) => {
    // look as req object
    const errors = validationResult(req);

    // check for errors
    if (!errors.isEmpty()) {
      // errors array - safely sends data back to user as an array within the json
      throw new Error("Invalid email or password");
    }

    const { email, password } = req.body;
    console.log("Creating a user");
    throw new Error("Error connecting to databse");
    res.send("Yeah yup!");
  }
);

// export and rename --> going to have many routers so need to rename each
export { router as signupRouter };
