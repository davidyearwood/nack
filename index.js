const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
const channels = require("./db/ChannelData");
const channelApiRoutes = require("./backend/routes/api/channels");
const ChannelsModel = require("./backend/models/channelsModel");
const store = require("./backend/store");

const port = process.env.PORT || 3000;
const ChannelsModelInstance = new ChannelsModel(store);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(channelApiRoutes);

io.on("connection", socket => {
  socket.on("chat message", msg => {
    const message = ChannelsModelInstance.addMessage(msg);
    if (message) {
      io.emit("chat message", message);
    } else {
      // This would normally be sent to a logging service of some sort
      console.log("Channel doesn't exist");
    }
  });

  socket.on("new channel", channel => {
    const c = ChannelsModelInstance.getChannel(channel.id);
    if (c) {
      socket.broadcast.emit("new channel", c);
    }
  });
});

server.listen(port, () => console.log(`Chat app listening on port ${port}!`));
