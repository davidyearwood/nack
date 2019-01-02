import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import uniqid from "uniqid";
import { format } from "date-fns";
import Message from "../presentational/Message/Message";
import Input from "../presentational/Input/Input";
import createMessage from "../../../helper/createMessage";

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
      displayName: "David",
      currentChannel: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Optional: TODO
  // Instead of fetching channels the data from the resource
  // only get data for the channel the user wants to see
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
      )
      .then(() => {
        const { channels } = this.state;
        this.setState({
          currentChannel: channels.find(channel => channel.id === 1)
        });
      });

    // listening for a chat message to be sent
    // if a message is sent, the message is added to
    // the currentChannel state
    this.socket.on("chat message", msg => {
      const { currentChannel } = this.state;

      currentChannel.msgs.push(msg);

      this.setState({
        currentChannel
      });
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
    const message = createMessage(displayName, messageInput, currentChannel.id);
    this.socket.emit("chat message", message);
    this.setState({
      messageInput: ""
    });
  }

  renderMessages() {
    const { currentChannel } = this.state;

    if (currentChannel.msgs) {
      return currentChannel.msgs.map(msg => (
        <Message
          key={uniqid()}
          src="https://via.placeholder.com/75"
          text={msg.msg}
          time={format(msg.timestamp, "MMM D, YYYY HH:mm A")}
          sender={msg.sender}
          alt=""
        />
      ));
    }
    return null;
  }

  render() {
    const { messageInput } = this.state;
    return (
      <div className="chat-app">
        {this.renderMessages()}
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
