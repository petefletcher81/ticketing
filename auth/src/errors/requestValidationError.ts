import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  // using private is the same as doing this.error = errors
  constructor(public errors: ValidationError[]) {
    // as we are extending a class we need to call super
    super();

    // Only becuase we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
