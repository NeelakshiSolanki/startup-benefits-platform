const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Authentication routes
router.post("/register", register);
router.post("/login", login);

// Get logged-in user
router.get("/me", protect, getMe);

module.exports = router;
