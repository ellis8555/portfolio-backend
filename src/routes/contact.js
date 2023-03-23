const express = require("express");
const router = express.Router();

const findAllMessages = require("../controllers/contact/findAllMessages");
const submitMessage = require("../controllers/contact/submitMessage");

router.get("/", findAllMessages);

router.post("/", submitMessage);

module.exports = router;
