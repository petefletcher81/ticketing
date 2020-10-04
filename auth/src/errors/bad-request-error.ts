import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  // as this error will be used alot we need to ensure
  // any message/string can be passed through
  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
