const express = require("express");
const ChannelsController = require("../../controllers/channelsController");

const router = express.Router();

router.get("/channels", ChannelsController.channelList);

router.get("/channels/:id", ChannelsController.channel);
router.get("/channels/:id/msgs", ChannelsController.channelMessages);
router.get(
  "/channels/:channelId/msgs/:msgId",
  ChannelsController.channelMessage
);
router.post("/channels", ChannelsController.addChannel);
router.post("/msgs", ChannelsController.addMessage);

module.exports = router;
