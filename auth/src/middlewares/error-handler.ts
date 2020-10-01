import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // send back consistantly structured error response
  if (err instanceof RequestValidationError) {
    console.log("Req error");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("dbconnection");
  }
  res.status(400).send({
    message: err.message,
  });
};
