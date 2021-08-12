const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
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
  password: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (value.length < 5) {
        throw new Error("Too short (Minimun 5 chars)");
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
    required: false,
    unique: false,
  },
  country: {
    type: String,
    required: false,
    unique: false,
  },
  postalCode: {
    type: String,
    required: false,
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

userSchema.pre("save", async function (next) {
  //Hashing passwords on create user
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.statics.findByCredentials = async (userName, paswword) => {
  const user = await userModel.findOne({ userName: userName });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(paswword, user.password);

  if (!isMatch) {
    throw new Error("Incorrect Inputs");
  }

  return user;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ email: user.email }, "nextDev", { expiresIn: "8h" });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const userModel = mongoose.model("nextUsers", userSchema);
module.exports = userModel;
