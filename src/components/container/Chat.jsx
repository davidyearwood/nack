import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Messages from "../presentational/Message/Messages";
import Input from "../presentational/Input/Input";
import createMessage from "../../../helper/createMessage";
import Modal from "../presentational/Modal/Modal";

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

  render() {
    const { messageInput, currentChannel } = this.state;
    return (
      <div className="chat-app">
        <Modal>
          <h2>What’s your display name?</h2>
          <input type="text" />
          <p>
            This could be your first name, or a nickname — however you’d like
            people to refer to you in Nack.
          </p>
          <button className="btn">Use Display Name</button>
        </Modal>
        {/* {<Messages msgs={currentChannel.msgs} />}
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
        </form> */}
      </div>
    );
  }
}

export default Chat;
