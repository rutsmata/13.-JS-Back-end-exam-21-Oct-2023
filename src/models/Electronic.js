const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [10, "Name should be at least 10 characters"],
  },
  type: {
    type: String,
    required: true,
    minLength: [2, "Type should be at least 2 characters"],
  },
  damages: {
    type: String,
    required: true,
    minLength: [10, "Damage should be at least 10 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Invalid URL"],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Description should be between 10 and 200 characters"],
    maxLength: [200, "Description should be between 10 and 200 characters"],
  },
  production: {
    type: Number,
    required: true,
    min: [1900, "Year should be between 1900 and 2023"],
    max: [2023, "Year should be between 1900 and 2023"],
  },
  exploitation: {
    type: Number,
    required: true,
    min: [1, "Exploitation should be positive number"],
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price should be positive number"],
  },
  buyingList: [
    {
      userId: mongoose.Types.ObjectId,
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = Electronic;
