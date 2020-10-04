import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describees the properties that the user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// schema is a how we tell mongoose about all the properties we are going to have
const userSchema = new mongoose.Schema({
  email: {
    // this is not tied to TS --> mongoose only --> referring to constructor
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// pre is a mongoose middleware and allows us to
// run this function before we build the user
userSchema.pre("save", async function (done) {
  // using the function keyword as we do not want to bind 'this'
  // to the current class, but we want to bind it to the instance
  // function this --> mongoose document -- access to getter setter
  // arrow this --> undefined

  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// to add a function to a model in mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// feed the schema into mongoose then it will create a model
// why we use the angle brackets
// generics -- fn or types
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
