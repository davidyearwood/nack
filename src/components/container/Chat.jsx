import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Messages from "../presentational/Message/Messages";
import createMessage from "../../../helper/createMessage";
import "../../styles/typography.css";
import DisplayNameForm from "../presentational/DisplayNameForm/DisplayNameForm";
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
      displayName: "David",
      currentChannel: {},
      displayNameInput: "",
      isDisplayNameOpen: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisplayNameInputChange = this.handleDisplayNameInputChange.bind(
      this
    );
    this.handleDisplayNameButtonClick = this.handleDisplayNameButtonClick.bind(
      this
    );
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

    // check to see if local storage has a display name already
  }

  handleChange(e) {
    this.setState({
      messageInput: e.target.value
    });
  }

  handleDisplayNameInputChange(e) {
    this.setState({
      displayNameInput: e.target.value
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

  handleDisplayNameButtonClick() {
    const { displayNameInput } = this.state;
    this.setState({
      displayName: displayNameInput,
      isDisplayNameOpen: false
    });
    // set in local storage
  }

  render() {
    const {
      messageInput,
      currentChannel,
      displayNameInput,
      isDisplayNameOpen
    } = this.state;
    let displayNameForm = (
      <DisplayNameForm
        onClick={this.handleDisplayNameButtonClick}
        onChange={this.handleDisplayNameInputChange}
        value={displayNameInput}
      />
    );

    if (!isDisplayNameOpen) {
      displayNameForm = null;
    }

    return (
      <div className="chat-app">
        {displayNameForm}
        {<Messages msgs={currentChannel.msgs} />}
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
