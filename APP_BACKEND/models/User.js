const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// SignUp
UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("All fields required");
  if (!validator.isEmail(email)) throw Error("invalid email");
  if (!validator.isStrongPassword(password))
    throw Error("Password is not strong");

  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

//Login
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields required");

  const user = await this.findOne({ email });
  if (!user) throw Error("Email does not exist");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Password is incorrect");
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
