const express = require("express");
const router = express.Router();

const { myAccount } = require("../controllers/account-ctrl");

router.get("/myaccount", myAccount);

module.exports = router;
