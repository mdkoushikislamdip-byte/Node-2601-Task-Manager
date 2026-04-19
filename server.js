const express = require("express");
const app = express();
const router = require("./route");
const dbConfig = require("./configs/dbConfig");
const cookieParser = require('cookie-parser')
require('dotenv').config()
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


app.use(cookieParser())
app.use(express.json());
app.use(router)
dbConfig()

app.listen(8000, () => console.log("Server is running."))