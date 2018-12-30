import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Message from "../presentational/Message/Message";
import Input from "../presentational/Input/Input";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      channels: []
    };
    this.endpoint = "http://localhost:3000";
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
  }

  render() {
    return (
      <div className="chat-app">
        <Message
          src="https://via.placeholder.com/75"
          text="What's up!"
          time="2:30 pm"
          sender="David Yearwood"
          alt=""
        />
        <form action="">
          <Input
            id="m"
            type="text"
            autoComplete="off"
            placeholder="Type a message"
            label="Send message"
            value=""
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
