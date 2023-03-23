require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { connectToDb } = require("./db/connect");

// variables
const app = express();
const PORT = process.env.PORT || 3500;

// middleware
app.use(express.json());

// get connection to the database
connectToDb();

// routes
app.use("/contact", require("./routes/contact"));

// server listening
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
