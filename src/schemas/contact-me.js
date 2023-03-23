const mongoose = require("mongoose");

const contactMeMessage = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, "minimum of 2 characters required"],
      maxLength: [20, "maximum of 20 characters allowed"],
      required: true,
    },
    userMessage: {
      type: String,
      maxLength: [100, `max character limit is 100`],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact-message", contactMeMessage);
