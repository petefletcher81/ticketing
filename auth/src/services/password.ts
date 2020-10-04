import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// scrypt is callback based and we wand to use async await
// using promisify allows us to do that
const scryptAsync = promisify(scrypt);

export class Password {
  // static methods -- used without creating an instance of the class
  // for example we can simply import then use Password.compare()
  static async toHash(password: string) {
    // how to hash a password
    // salt will make a unique hash output even for common passwords
    // adds randomness to the hash process
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashedPassword;
  }
}
