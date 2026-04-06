const express = require("express");
const { registration, verifyOTP, login } = require("../controllers/authcontroller");
const router = express.Router()

router.post("/registration", registration)
router.post("/verify-otp", verifyOTP)
router.post("/login", login)

module.exports = router;