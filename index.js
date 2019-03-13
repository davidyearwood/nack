const dotenv = require("dotenv").config();
const express = require("express");

const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
const fs = require("fs");
const fileType = require("file-type");
const path = require("path");
const cloudinary = require("cloudinary");
const channels = require("./db/ChannelData");
const channelApiRoutes = require("./backend/routes/api/channels");
const ChannelsModel = require("./backend/models/channelsModel");
const store = require("./backend/store");

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

  // evaluate the meta data - file name and path to make sure the file
  // that is being stored is being stored properly in the currect directory
  // and not a name that can overwrite a file

  // File size and content (what is the file used for?)

  socket.on("uploadfile", file => {
    const filePath = path.parse(file.name);
    const allowedMimeTypes = ["image/jpeg", "image/png"];

    const { mime } = fileType(file.data);

    if (allowedMimeTypes.includes(mime)) {
      console.log("correct mime type");
      const { name, ext } = path.parse(file.name);
      const base64Img = `data:image/jpeg;base64,${Buffer.from(
        file.data
      ).toString("base64")}`;

      cloudinary.v2.uploader.upload(base64Img, (err, result) => {
        if (!err) {
          console.log(result);
        }

        if (result) {
          socket.emit("uploadFile", {
            image: true,
            type: file.type,
            data: Buffer.from(file.data).toString("base64"),
            src: "data:image/jpeg;base64,",
            url: result.url
          });
        }
      });
    }
    // if (whiteList[fileType(file.data).mime]) {
    //   // perform some file validation
    //   console.log("Valid");
    //   fs.writeFile(`./file_storage/images/${filePath.base}`, file.data, err => {
    //     if (err) {
    //       console.log(err);
    //     }

    //     socket.emit("uploadFile", {
    //       image: true,
    //       type: file.type,
    //       data: Buffer.from(file.data).toString("base64"),
    //       src: "data:image/jpeg;base64,"
    //     });
    //   });
    // }
  });
});

server.listen(port, () => console.log(`Chat app listening on port ${port}!`));
