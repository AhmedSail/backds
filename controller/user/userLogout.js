const express = require("express");

async function userLogout(req, res) {
  try {
    // مسح ملف تعريف الارتباط الذي يحتوي على الرمز (token)
    res.clearCookie("token", {
      // httpOnly: true,
      secure: true,
      sameSite: "strict", // استخدام نفس الموقع لتعزيز الأمان
    });

    // إرسال استجابة تشير إلى النجاح
    res.status(200).json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
