const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
const compareAsc = require("date-fns/compare_asc");
const channels = require("./db/ChannelData");
const channelApiRoutes = require("./backend/routes/api/channels");
const store = require("./backend/store");

const port = process.env.PORT || 3000;

const currentId = channels.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(channelApiRoutes);

function getChannel(id) {
  return channels.find(
    channel => parseInt(channel.id, 10) === parseInt(id, 10)
  );
}

function addMessageToChannel(channel, msg) {
  channel.msgs.push(msg);
  channel.msgCount += 1;
  const LIMIT = 100;

  if (channel.msgCount > LIMIT) {
    channel.msgs = channel.msgs.slice(channel.msgCount - LIMIT);
    channel.msgCount = channel.msgs.length;
  }
}

// a message is sent
// get the channel
// store the message into the channel
let usersConnected = 0;
io.on("connection", socket => {
  usersConnected += 1;
  console.log(usersConnected);
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
