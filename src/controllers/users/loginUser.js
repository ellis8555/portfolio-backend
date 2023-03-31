const bcrypt = require("bcrypt");
const User = require("../../schemas/users");

const loginUser = async (req, res) => {
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
    const findUser = await User.findOne({ username: "Ellis" });
    if (findUser) {
      const credentialsMatch = await bcrypt.compare(
        password,
        findUser.password
      );
      if (credentialsMatch) {
        // create token
        res
          .status(200)
          .json({ username, message: `${username} you are now signed in` });
      } else {
        res.status(404).json({
          message: "Username and password don't match",
          field: "notFound",
        });
      }
    } else {
      res.status(404).json({
        message: "Username and password don't match",
        field: "notFound",
      });
    }
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

module.exports = loginUser;
