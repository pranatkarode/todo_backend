const jwt = require("jsonwebtoken");
//optional chaining

async function authenticate(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      ok: false,
      msg: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      ok: false,
      msg: "Unauthorized",
    });
  }
}

module.exports = { authenticate };
