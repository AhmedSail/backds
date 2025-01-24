const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details retrieved successfully",
    });
  } catch (err) {
    console.error("Error retrieving user details:", err);

    res.status(500).json({
      message: err.message || "An error occurred while retrieving user details",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
