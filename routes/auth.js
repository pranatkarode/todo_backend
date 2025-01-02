const express = require("express");
const router = express.Router();
const { registerNewUser } = require("../controllers/user");
router.get(
  "/auth/check",
  (req, res, next) => {
    console.log("middleware working");
    next();
  },
  (req, res) => {
    res.status(200).json({
      message: "working",
    });
  }
);

router.post("/auth/register", registerNewUser);

module.exports = router;
