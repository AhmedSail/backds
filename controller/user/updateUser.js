const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        error: true,
        success: false,
      });
    }

    // تحديد الحقول القابلة للتحديث
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    // العثور على المستخدم الذي يقوم بالتحديث
    const user = await userModel.findById(sessionUser);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    console.log("user.role", user.role);

    // التحقق من صلاحيات المستخدم (يمكن تعديل هذا الجزء وفقًا للاحتياجات)
    if (user.role !== "ADMIN" && user._id.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update this user",
        error: true,
        success: false,
      });
    }

    // تحديث المستخدم
    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    res.status(200).json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while updating the user",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
