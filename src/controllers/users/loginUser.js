const bcrypt = require("bcrypt");
const User = require("../../schemas/users");
const createToken = require("../../utils/jwt");

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
    const findUser = await User.findOne({ username });
    if (findUser) {
      // user var for clarity when used further down
      const user = findUser;
      // check user password to password stored in db
      const credentialsMatch = await bcrypt.compare(password, user.password);
      if (credentialsMatch) {
        const accessToken = createToken(user);
        res
          .cookie("access-token", accessToken, {
            maxAge: 3_600_000,
            secure: true,
            samesite: "none",
            path: "/",
          })
          .cookie("username", user.username, {
            maxAge: 3_600_000,
            secure: true,
            samesite: "none",
            path: "/",
          })
          .status(200)
          .json({
            username,
            message: `${username} you are now signed in`,
          });
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
