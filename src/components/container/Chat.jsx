import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Message from "../presentational/Message/Message";
import Input from "../presentational/Input/Input";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.endpoint = "http://localhost:3000";
    this.socket = io(this.endpoint);
    this.state = {
      error: null,
      isLoaded: false,
      channels: [],
      messageInput: "",
      messages: []
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
        text: msg,
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
    const { messageInput } = this.state;
    this.socket.emit("chat message", messageInput);
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
            key={
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            }
            src="https://via.placeholder.com/75"
            text={msg.text}
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
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
