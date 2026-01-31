const Claim = require("../models/Claim");
const Deal = require("../models/Deal");

// CLAIM A DEAL
exports.claimDeal = async (req, res) => {
  try {
    const userId = req.user._id;
    const dealId = req.params.dealId;

    if (!dealId) {
      return res
        .status(400)
        .json({ message: "Deal ID is required" });
    }

    const deal = await Deal.findById(dealId);
    if (!deal || !deal.isActive) {
      return res
        .status(404)
        .json({ message: "Deal not found" });
    }

    // Check access for locked deals
    if (deal.accessLevel === "locked" && !req.user.isVerified) {
      return res
        .status(403)
        .json({
          message: "Please verify your account to claim this deal",
        });
    }

    // Prevent duplicate claims
    const alreadyClaimed = await Claim.findOne({
      user: userId,
      deal: dealId,
    });

    if (alreadyClaimed) {
      return res
        .status(400)
        .json({ message: "Deal already claimed" });
    }

    const newClaim = await Claim.create({
      user: userId,
      deal: dealId,
      status: "pending",
    });

    res.status(201).json({
      message: "Deal claimed successfully",
      claim: newClaim,
    });
  } catch (error) {
    console.log("Claim deal error:", error);
    res.status(500).json({
      message: "Failed to claim deal",
    });
  }
};

// GET LOGGED-IN USER CLAIMS
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      user: req.user._id,
    }).populate("deal");

    res.json(claims);
  } catch (error) {
    console.log("Get claims error:", error);
    res.status(500).json({
      message: "Failed to fetch claims",
    });
  }
};
