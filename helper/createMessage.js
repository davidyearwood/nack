import uniqid from "uniqid";

function createMessage(sender, msg, channelId, type = "text") {
  return {
    sender,
    msg,
    channelId,
    type
  };
}

export default createMessage;
