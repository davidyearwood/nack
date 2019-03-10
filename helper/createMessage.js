import uniqid from "uniqid";

function createMessage(sender, msg, channelId) {
  return {
    sender,
    msg,
    channelId
  };
}

export default createMessage;
