const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: "https://forntds.netlify.app", // السماح بالطلبات من الأصل المحدد
    credentials: true, // السماح بإرسال الكوكيز مع الطلبات
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connect to DB");
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });
