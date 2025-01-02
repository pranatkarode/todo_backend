const User = require("../models/user");
const { successResponse, failureResponse } = require("../utils/response");
async function registerNewUser(req, res) {
  const { userName, email, password, firstName, lastName } = req.body;
  console.log("body", req.body);
  try {
    const user = new User({ userName, email, password, firstName, lastName });
    await user.save();
    res.status(201).json(successResponse("User registered successfully."));
  } catch (error) {
    console.log("error", error, error.message);
    if (error.name === "ValidationError") {
      res.status(400).json(failureResponse(error.message));
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json(failureResponse(`${field} alreaddy exists`));
    }
  }
}

module.exports = { registerNewUser };
