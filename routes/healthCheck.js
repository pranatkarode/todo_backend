const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.send({
    message: "Health is fine",
  });
});

module.exports = router;
