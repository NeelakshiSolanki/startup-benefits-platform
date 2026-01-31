const express = require("express");
const router = express.Router();

const {
  getAllDeals,
  getDealById,
} = require("../controllers/dealController");

// Fetch all active deals
router.get("/", getAllDeals);

// Fetch single deal by id
router.get("/:id", getDealById);

module.exports = router;
