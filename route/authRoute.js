const express = require("express");
// const multer  = require('multer')


const { registration, verifyOTP, login, userProfile, updateProfile } = require("../controllers/authcontroller");
const {authMiddleware} = require ("../middleware/authMiddleware");
const upload = require("../helpers/multerService");

const router = express.Router()

router.post("/registration", registration)
router.post("/verify-otp", verifyOTP)
router.post("/login", login)
router.get("/profile", authMiddleware, userProfile )
router.put("/update-profile", authMiddleware, upload.single("avatar"), updateProfile)

module.exports = router;