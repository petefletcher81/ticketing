import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  // using private is the same as doing this.error = errors
  constructor(public errors: ValidationError[]) {
    // as we are extending a class we need to call super
    // the string is for loggin purposes in this respect
    super("Invalid reqeust params");

    // Only becuase we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
