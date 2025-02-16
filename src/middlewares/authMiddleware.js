const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Access denied, no token provided" });
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id, { attributes: { exclude: ["password"] } });

    if (!req.user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};