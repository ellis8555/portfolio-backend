require("dotenv").config();
const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
};

module.exports = createToken;
