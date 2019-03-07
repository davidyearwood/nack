const express = require("express");
const ChannelsController = require("../../controllers/channelsController");

const router = express.Router();

router.get("/channels", ChannelsController.channelList);

router.get("/channels/:id", ChannelsController.channel);
router.get("/channels/:channelId/msg", ChannelsController.channelMessages);
router.get(
  "/channels/:channelId/msg/:msgId",
  ChannelsController.channelMessage
);
router.post("/channels", ChannelsController.addChannel);
router.post("/channel/:channelId/msg", ChannelsController.addMessage);

module.exports = router;
