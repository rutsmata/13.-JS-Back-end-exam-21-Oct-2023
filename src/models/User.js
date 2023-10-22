const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/constants");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Username should be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, "Email should be at least 10 characters"],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLength: [4, "Password should be at least 4 characters"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, SALT);

  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
