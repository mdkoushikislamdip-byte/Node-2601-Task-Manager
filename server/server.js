const express = require("express");
const app = express();
const router = require("./route");
const dbConfig = require("./configs/dbConfig");
const cookieParser = require('cookie-parser')
require('dotenv').config()
const cors = require('cors')

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}),
);
app.use(router)
dbConfig()

app.listen(8000, () => console.log("Server is running."))