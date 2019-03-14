const dotenv = require("dotenv").config();
const express = require("express");

const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
const fileType = require("file-type");
const cloudinary = require("cloudinary");
const channelApiRoutes = require("./backend/routes/api/channels");
const ChannelsModel = require("./backend/models/channelsModel");
const store = require("./backend/store");
const isMessageTypeAllowed = require("./backend/utils/isMessageTypeAllowed");

const port = process.env.PORT;
const ChannelsModelInstance = new ChannelsModel(store);

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.static("file_storage"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(channelApiRoutes);

io.on("connection", socket => {
  socket.on("chat message", msg => {
    if (!isMessageTypeAllowed(msg.type)) {
      console.log(`${msg.type} isn't allowed`);
      return false;
    }

    switch (msg.type) {
      case "image": {
        const FILE_SIZE_LIMIT = 5000000;

        if (Buffer.isBuffer(msg.msg)) {
          const allowedMimeTypes = ["image/jpeg", "image/png"];
          const { mime } = fileType(msg.msg);
          if (Buffer.byteLength(msg.msg) > FILE_SIZE_LIMIT) {
            console.log(`Message exceed the limit`);
            break;
          }
          if (allowedMimeTypes.includes(mime)) {
            console.log("correct mime type");
            const base64Img = `data:image/jpeg;base64,${Buffer.from(
              msg.msg
            ).toString("base64")}`;

            cloudinary.v2.uploader.upload(base64Img, (err, result) => {
              if (!err) {
                console.log(result);
              }

              if (result) {
                const updatedMsg = Object.assign({}, msg, { msg: result.url });
                const message = ChannelsModelInstance.addMessage(updatedMsg);
                if (message) {
                  io.emit("chat message", message);
                }
              }
            });
          }
        }
        break;
      }
      case "text":
        {
          const message = ChannelsModelInstance.addMessage(msg);
          if (message) {
            io.emit("chat message", message);
          }
        }
        break;
      default:
        console.log("Unable to handle message");
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
