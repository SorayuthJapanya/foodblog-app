const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protectAuth = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectAuth middleware");
    res.clearCookie("token");
    res.status(500).json({ message: "Internal server error" });
  }
};
