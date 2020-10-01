export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";
  // using private is the same as doing this.error = errors
  constructor() {
    // as we are extending a class we need to call super
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
