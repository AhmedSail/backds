const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log("Cookies: ", req.cookies); // تحقق من الكوكيز
    console.log("Token: ", token); // تحقق من التوكن
    if (!token || token === "undefined") {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.error("Error during authentication", err);
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }
      req.userId = decoded._id; // تعيين userId في req
      next();
    });
  } catch (err) {
    console.error("Error in authToken middleware", err);
    res.status(500).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
