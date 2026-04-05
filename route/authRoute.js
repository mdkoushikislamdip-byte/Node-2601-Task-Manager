const express = require("express");
const { registration } = require("../controllers/authcontroller");
const router = express.Router()

router.post("/registration", registration)

module.exports = router;