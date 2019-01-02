import uniqid from "uniqid";

function createMessage(sender, msg, channelId) {
  return {
    id: uniqid(),
    sender,
    msg,
    channelId
    timestamp: new Date.toString(),
  };
}

export default createMessage;