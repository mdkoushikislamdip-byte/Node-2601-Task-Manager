const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const projectRoute = require("./projectRoute");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
  res.status(200).send("Hello From Server");
});

router.use("/auth", authRoute);

router.use("/project", authMiddleware, projectRoute);

module.exports = router;


// bdvRT9YwLv9UAajS