export abstract class CustomError extends Error {
  // by having abstract here we are saying a subclass must have it
  abstract statusCode: number;

  // we only need a constructor here are we are setting this
  // on the extending class of a built in class
  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
