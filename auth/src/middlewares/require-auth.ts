import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "../errors/not-authorized-error";

// by the time this request is ran here se should of already
// -- decoded it and set it on req.currentUser
// -- if not defined -- need to rejct
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
