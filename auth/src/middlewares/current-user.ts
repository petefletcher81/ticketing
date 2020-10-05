import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// this is how we modify an existing interface
// this is the Express Request interface and we are now
// saying that the currentUser with the user payload is optional
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.jwt_key!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {}
  next();
};
