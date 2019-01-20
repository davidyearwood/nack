import uniqid from "uniqid";

function createMessage(sender, msg, channelId, name) {
  return {
    id: uniqid(),
    sender,
    msg,
    channelId,
    name,
    timestamp: new Date().toString()
  };
}

export default createMessage;
