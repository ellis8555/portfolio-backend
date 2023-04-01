const bcrypt = require("bcrypt");
const User = require("../../schemas/users");
const createToken = require("../../utils/jwt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res
      .status(400)
      .json({ message: "Please enter a username", field: "username" });
  }
  if (!password) {
    res
      .status(400)
      .json({ message: "Please enter password", field: "password" });
  }

  try {
    const doesUserNameExist = await User.findOne({ username });
    if (!doesUserNameExist) {
      const hashedPassword = await bcrypt.hash(password, 13);
      const credentials = {
        username,
        password: hashedPassword,
      };
      const newUser = new User(credentials);
      await newUser.save();
      const accessToken = createToken(credentials);
      res
        .status(201)
        .cookie("access-token", accessToken, {
          maxAge: 3_600_000,
          secure: true,
          samesite: "none",
          path: "/",
        })
        .cookie("username", username, {
          maxAge: 3_600_000,
          secure: true,
          samesite: "none",
          path: "/",
        })
        .json({
          username,
          message: `${username} your account has been created!`,
        });
    } else {
      res.status(409).json({
        message: "That username is already taken. Please try another username",
        field: "duplicate",
      });
    }
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

module.exports = registerUser;
