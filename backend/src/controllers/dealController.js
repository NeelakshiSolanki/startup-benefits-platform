const Deal = require("../models/Deal");

// GET ALL ACTIVE DEALS
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find({
      isActive: true,
    });

    res.json(deals);
  } catch (error) {
    console.log("Fetch deals error:", error);
    res.status(500).json({
      message: "Failed to fetch deals",
    });
  }
};

// GET DEAL BY ID
exports.getDealById = async (req, res) => {
  try {
    const dealId = req.params.id;

    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res
        .status(404)
        .json({ message: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    console.log("Fetch deal error:", error);
    res.status(500).json({
      message: "Failed to fetch deal",
    });
  }
};
