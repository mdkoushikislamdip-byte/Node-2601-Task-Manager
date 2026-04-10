const express = require("express");
const { registration, verifyOTP, login, userProfile } = require("../controllers/authcontroller");
const {authMiddleware} = require ("../middleware/authMiddleware");

const router = express.Router()

router.post("/registration", registration)
router.post("/verify-otp", verifyOTP)
router.post("/login", login)
router.get("/profile", authMiddleware, userProfile )

module.exports = router;