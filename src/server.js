require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db/connect");

// variables
const app = express();
const PORT = process.env.PORT || 3500;

// cors

app.use(
  cors({
    origin: "http://localhost:9000",
    methods: ["GET", "POST"],
  })
);

// get connection to the database
connectToDb().then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// middleware
app.use(express.json());

// routes
app.use("/contact", require("./routes/contact"));
