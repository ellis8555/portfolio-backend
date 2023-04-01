const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [2, "minimum of 2 characters required"],
      maxLength: [30, "maximum of 30 characters allowed"],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [8, "A minimum password length of 8 is required"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", User);
