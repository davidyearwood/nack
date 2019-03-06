const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
const compareAsc = require("date-fns/compare_asc");
const channels = require("./db/ChannelData");

const port = 3000;
let currentId = channels.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getChannel(id) {
  return channels.find(
    channel => parseInt(channel.id, 10) === parseInt(id, 10)
  );
}

function addMessageToChannel(channel, msg) {
  channel.msgs.push(msg);
  channel.msgCount += 1;
  const LIMIT = 100;

  if (channel.msgs.length > LIMIT) {
    channel.msgs = channel.msgs.slice(channel.msgs.length - LIMIT);
  }
}

app.get("/channels", (req, res) => {
  const { query } = req;

  let data = channels;

  // must refactor
  if ("fields" in query) {
    const fields = query.fields.split(","); // [name, id]

    data = data.map(channel => {
      const obj = {};
      for (let i = 0; i < fields.length; i++) {
        if (channel.hasOwnProperty(fields[i])) {
          obj[fields[i]] = channel[fields[i]];
        }
      }

      return obj;
    });
  }

  res.json(data);
});

app.get("/channels/:id", (req, res) => {
  if (!getChannel(req.params.id)) {
    return res.status(404).json({ error: "Channel not found" });
  }

  return res.json(getChannel);
});

app.get("/channels/:channelId/msg", (req, res) => {
  const channel = getChannel(req.params.channelId);

  if (!channel) {
    return res.status(404).json({ error: "Channel not found" });
  }

  return res.json(channel.msgs);
});

app.get("/channels/:channelId/msg/:msgId", (req, res) => {
  const { msgId, channelId } = req.params;
  const channel = getChannel(channelId);

  if (!channel) {
    return res.status(404).json({ error: "Channel not found" });
  }

  const message = channel.msgs.find(
    msg => parseInt(msg.id, 10) === parseInt(msgId, 10)
  );

  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  return res.json(message);
});

app.post("/channels", (req, res) => {
  const { name, creator } = req.body;
  if (!req.body.name && !req.body.creator) {
    return res.status(500).json({ error: "Internal Server Error." });
  }

  const hasChannel = channels.find(
    channel => channel.name.toLowerCase() === req.body.name.toLowerCase()
  );

  if (hasChannel) {
    return res.status(409).json({
      error: "The channel you attempted to create already exists."
    });
  }

  const newChannel = {
    id: currentId + 1,
    name,
    msgs: [],
    creator,
    msgCount: 0
  };

  channels.push(newChannel);
  currentId += 1;
  return res.status(201).json(newChannel);
});

app.post("/channel/:channelId/msg", (req, res) => {
  const { channelId } = req.params;
  const channel = getChannel(channelId);
  const { timestamp, sender, msg } = req.body;

  if (!channel) {
    return res.status(404).json({ error: "Channel doesn't exist" });
  }

  const messageId = channel.msgs.length + 1;
  const payload = {
    id: messageId,
    timestamp,
    sender,
    channelId,
    msg
  };

  channel.msgs.push(payload);
  return res.status(201).json(payload);
});

// a message is sent
// get the channel
// store the message into the channel

io.on("connection", socket => {
  // listens to client messages
  socket.on("chat message", msg => {
    // sends an emit message when it receives a msg
    io.emit("chat message", msg);
    // adds to the db
    const channel = getChannel(msg.channelId);
    addMessageToChannel(channel, msg);
  });

  socket.on("new channel", channel => {
    const c = getChannel(channel.id);
    // check to see if channel exists
    if (c) {
      socket.broadcast.emit("new channel", c);
    }
  });
});

server.listen(port, () => console.log(`Chat app listening on port ${port}!`));
