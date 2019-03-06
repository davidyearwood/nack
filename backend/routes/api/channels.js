const express = require("express");

const router = express.Router();

router.get("/channels");
router.get("/channels/:id");
router.get("/channels/:channelId/msg");
router.get("/channels/:channelId/msg/:msgId");
router.post("/channels");
router.post("/channel/:channelId/msg");

module.exports = router;
