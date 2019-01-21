import React, { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Messages from "../presentational/Message/Messages";
import createMessage from "../../../helper/createMessage";
import "../../styles/typography.css";
import stylesLayout from "../../styles/layout.css";
import DisplayNameForm from "../presentational/DisplayNameForm/DisplayNameForm";
import Input from "../presentational/Input/Input";
import Channels from "../presentational/Channels/Channels";
import Sidebar from "../presentational/Sidebar/Sidebar";
import DisplayName from "../presentational/DisplayName/DisplayName";
import { Route } from "react-router-dom";
import { withRouter, Switch } from "react-router";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.endpoint = "http://localhost:3000";
    this.socket = io(this.endpoint);
    const lastChannelSelected = JSON.parse(
      localStorage.getItem("lastChannelSelected")
    ) || {
      name: "JavaScript",
      id: "1"
    };
    this.state = {
      selectedChannel: lastChannelSelected,
      isFetching: false,
      hasError: null,
      isLoaded: false,
      channels: {},
      messageInput: "", // user message input is stored here
      displayName: "",
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
    this.renderMessages = this.renderMessages.bind(this);
  }

  // Optional: TODO
  // Instead of fetching channels the data from the resource
  // only get data for the channel the user wants to see
  componentDidMount() {
    // replace original path

    // I am fetching for channels
    this.setState({ isFetching: true });
    fetch("/api/channels")
      .then(res => res.json())
      .then(
        result => {
          const channels = result.reduce(
            (acc, cv) =>
              Object.assign(acc, {
                [cv.name]: {
                  ...cv,
                  isFetching: false,
                  isStale: false,
                  hasError: null
                }
              }),
            {}
          );

          this.setState({
            isFetching: false,
            isLoaded: true,
            channels
          });
        },
        error => console.log(error)
      );

    // listening for a chat message to be sent
    // if a message is sent, the message is added to
    // the currentChannel state
    this.socket.on("chat message", msg => {
      const { channels } = this.state;
      const channel = channels[msg.name];
      channel.msgs.push(msg);

      this.setState({
        channels: {
          ...channels,
          [channel.name]: {
            ...channel
          }
        }
      });
    });

    // check to see if local storage has a display name already
    const displayName = localStorage.getItem("displayName");
    if (displayName) {
      this.setState({
        displayName,
        isDisplayNameOpen: false
      });
    }

    const { history } = this.props;
    const { selectedChannel } = this.state;

    this.changeUrlPath(`/channels/${selectedChannel}`, {
      id: selectedChannel.id,
      name: selectedChannel.name
    });

    // changeSelectedChannel
    this.unlistenToHistory = history.listen(location => {
      const { id, name } = location.state;
      this.setState({
        selectedChannel: {
          id,
          name
        }
      });
      localStorage.setItem("lastChannelSelected", JSON.stringify({ id, name }));
    });
  }

  componentWillUnmount() {
    this.unlistenToHistoryToHistory();
  }

  changeUrlPath(path, state = {}) {
    const { history } = this.props;
    history.replace(path, state);
  }

  // this can be refactor
  hc(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleChange(e) {
    this.hc(e, "messageInput");
  }

  handleDisplayNameInputChange(e) {
    this.hc(e, "displayNameInput");
  }

  handleSubmit(e) {
    e.preventDefault();
    const { messageInput, selectedChannel, displayName } = this.state;
    const message = createMessage(
      displayName,
      messageInput,
      selectedChannel.id,
      selectedChannel.name
    );
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

    localStorage.setItem("displayName", displayNameInput);
  }

  renderDisplayNameForm() {
    const { isDisplayNameOpen, displayNameInput } = this.state;

    if (isDisplayNameOpen) {
      return (
        <DisplayNameForm
          onClick={this.handleDisplayNameButtonClick}
          onChange={this.handleDisplayNameInputChange}
          value={displayNameInput}
        />
      );
    }

    return null;
  }

  renderMessages({ match }) {
    const { channels, isLoaded, selectedChannel } = this.state;
    if (match.path === "/") {
      return isLoaded ? (
        <Messages msgs={channels[selectedChannel.name].msgs} />
      ) : null;
    }

    return isLoaded ? <Messages msgs={channels[match.params.id].msgs} /> : null;
  }

  render() {
    const {
      messageInput,
      channels,
      displayName,
      isLoaded,
      selectedChannel
    } = this.state;

    return (
      <div className={stylesLayout["chat-app"]}>
        {this.renderDisplayNameForm()}
        <Sidebar>
          <DisplayName userName={displayName} />
          {<Channels title="Channels" items={channels} />}
        </Sidebar>
        <main className={stylesLayout.main}>
          <Switch>
            <Route path="/" exact component={this.renderMessages} />
            <Route path="/channels/:id" component={this.renderMessages} />
          </Switch>
          <form
            action=""
            onSubmit={this.handleSubmit}
            className={stylesLayout["chat-form"]}
          >
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
        </main>
      </div>
    );
  }
}

export default withRouter(Chat);
