require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db/connect");

// variables
const app = express();
const PORT = process.env.PORT || 3500;

// middleware
app.use(express.json());

// cors
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.ORIGIN_REACT],
    methods: ["GET", "POST"],
  })
);

// get connection to the database
connectToDb().then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// routes
app.use("/contact", require("./routes/contact"));
app.use("/user", require("./routes/user"));

module.exports = app ;
