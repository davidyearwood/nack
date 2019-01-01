import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import uniqid from "uniqid";
import Message from "../presentational/Message/Message";
import Input from "../presentational/Input/Input";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.endpoint = "http://localhost:3000";
    this.socket = io(this.endpoint);
    this.state = {
      error: null,
      isLoaded: false, // let you know if the data has been fetched
      channels: [], // all the channels data is stored here
      messageInput: "", // user message input is stored here
      messages: [], // messages of the current channel
      displayName: "David",
      currentChannel: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/api/channel")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            channels: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    this.socket.on("chat message", msg => {
      const { messages } = this.state;

      const m = {
        msg: msg.msg,
        time: new Date().toString(),
        sender: "david"
      };

      messages.push(m);

      this.setState({
        messages
      });

      console.log("component did mount");
    });
  }

  handleChange(e) {
    this.setState({
      messageInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { messageInput, currentChannel, displayName } = this.state;

    const payload = {
      id: uniqid(),
      msg: messageInput,
      channelId: currentChannel,
      timestamp: new Date().toString(),
      sender: displayName
    };

    this.socket.emit("chat message", payload);
    this.setState({
      messageInput: ""
    });
  }

  render() {
    const { messageInput } = this.state;
    const { messages } = this.state;
    return (
      <div className="chat-app">
        {messages.map(msg => (
          <Message
            key={uniqid()}
            src="https://via.placeholder.com/75"
            text={msg.msg}
            time={msg.time}
            sender={msg.sender}
            alt=""
          />
        ))}
        <form action="" onSubmit={this.handleSubmit}>
          <Input
            id="m"
            type="text"
            autoComplete="off"
            placeholder="Type a message"
            label="Send message"
            value={messageInput}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default Chat;
