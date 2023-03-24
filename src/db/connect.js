require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.HOME_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectToDb };
