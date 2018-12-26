import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      channels: [],
      endpoint: "http://localhost:3000"
    };
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
    console.log(io(this.state.endpoint));
    return (
      <div className="chat-app">
        <ul id="messages" />
        <form action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
