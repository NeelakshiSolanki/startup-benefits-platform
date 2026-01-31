const express = require("express");
const router = express.Router();

const {
  claimDeal,
  getMyClaims,
} = require("../controllers/claimController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get logged-in user's claims
router.get("/my", protect, getMyClaims);

// Claim a deal
router.post("/:dealId", protect, claimDeal);

module.exports = router;
