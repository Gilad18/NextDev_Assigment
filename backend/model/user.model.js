const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid Adress");
      }
    },
  },
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  city: {
    type: String,
    required: true,
    unique: false,
  },
  country: {
    type: String,
    required: true,
    unique: false,
  },
  postalCode: {
    type: String,
    required: true,
    unique: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ email: user.email }, "nextDev", { expiresIn: "8h" });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const userModel = mongoose.model("nextUsers", userSchema);
module.exports = userModel;
