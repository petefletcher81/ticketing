import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";
import { NewExpression } from "typescript";
import { RequestValidationError } from "../errors/requestValidationError";

// this is validation error middleware so we want to throw errors not capture
// express error handler middleware will have 4 args including error
// this one has 3 args
export const validationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
