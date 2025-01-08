const User = require("../models/user");
const { successResponse, failureResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");

async function registerNewUser(req, res) {
  const { userName, email, password, firstName, lastName } = req.body;
  try {
    const user = new User({ userName, email, password, firstName, lastName });
    await user.save();
    res.status(201).json(successResponse("User registered successfully."));
  } catch (error) {
    console.log("error", error, error.cause, error.message);
    if (error.name === "ValidationError") {
      const errArray = error.message
        .split(": ")
        .splice(1)
        .join(":")
        .split(", ");
      const errObj = errArray.reduce((acc, curr) => {
        const key = curr.split(":")[0];
        const value = curr.split(":")[1];
        return { ...acc, [key]: value };
      }, {});
      res.status(400).json({
        ok: false,
        msg: error.message.split(":")[0],
        errors: errObj,
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json(failureResponse(`${field} alreaddy exists`));
    }
  }
}

async function login(req, res) {
  const { userName, email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });
    if (!user) {
      res.status(400).json({
        ok: false,
        msg: "Invalid username or email",
      });
      return;
    }
    const correctPassword = await user.comparePassword(password);
    if (!correctPassword) {
      res.status(400).json({
        ok: false,
        msg: "Invalid Password",
      });
      return;
    }
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json(failureResponse());
  }
}

module.exports = { registerNewUser, login };
