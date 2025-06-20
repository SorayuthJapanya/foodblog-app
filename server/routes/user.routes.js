const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  logout,
  getMeUser,
} = require("../controller/user.controller");

const { protectAuth } = require("../middleware/protectAuth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", protectAuth, getUser);
router.post("/logout", protectAuth, logout);
router.get("/me", protectAuth, getMeUser);

module.exports = {
  userRoutes: router,
};
