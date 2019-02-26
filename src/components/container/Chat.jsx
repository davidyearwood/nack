import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter, Switch } from "react-router";
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
import ChannelForm from "../presentational/ChannelForm/ChannelForm";
import SvgClose from "../presentational/Svg/SvgClose";
import SiteHeader from "../presentational/SiteHeader";
import SidebarHeader from "../presentational/SidebarHeader";
import ChannelHeader from "../presentational/ChannelHeader";
import PlusIcon from "../presentational/Svg/PlusIcon";
import Logo from "../presentational/Logo";

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
      isDisplayNameOpen: true,
      channelInput: "",
      isChannelFormOpen: false,
      isChannelFormInvalid: false,
      channelFormErrorMsg: ""
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
    this.createChannel = this.createChannel.bind(this);
    this.addMessageToChannel = this.addMessageToChannel.bind(this);
    this.handleChannelInput = this.handleChannelInput.bind(this);
    this.openChannelForm = this.openChannelForm.bind(this);
    this.closeChannelForm = this.closeChannelForm.bind(this);
    this.handleChannelInputBlur = this.handleChannelInputBlur.bind(this);
  }

  componentDidMount() {
    // Fetch all channels
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

    // Add messages to the state
    this.socket.on("chat message", msg => {
      this.addMessageToChannel(msg);
    });

    // check to see if local storage has a display name already
    const displayName = localStorage.getItem("displayName");
    if (displayName) {
      this.setState({
        displayName,
        isDisplayNameOpen: false
      });
    }

    // Change Url path
    const { selectedChannel } = this.state;
    this.changeUrlPath(`/channels/${selectedChannel.name}`, {
      id: selectedChannel.id,
      name: selectedChannel.name
    });

    // update selected channel when the route changes
    const { history } = this.props;
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

  openChannelForm() {
    this.setState({
      isChannelFormOpen: true
    });
  }

  closeChannelForm() {
    this.setState({
      isChannelFormOpen: false
    });
  }

  handleChannelInputBlur() {
    const { channels, channelInput } = this.state;
    let isChannelFormInvalid = false;
    let errorMsg = "";
    if (channels[channelInput]) {
      isChannelFormInvalid = true;
      errorMsg = "Looks like the channel already exists.";
    } else {
      isChannelFormInvalid = false;
    }

    this.setState({
      isChannelFormInvalid,
      channelFormErrorMsg: errorMsg
    });
  }

  createChannel() {
    const {
      displayName,
      channelInput,
      channels,
      isChannelFormInvalid
    } = this.state;

    if (!isChannelFormInvalid) {
      fetch("/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: channelInput, creator: displayName })
      })
        .then(res => res.json())
        .then(res => {
          const newChannel = Object.assign({}, res);

          this.setState({
            channels: {
              ...channels,
              [newChannel.name]: newChannel
            },
            channelInput: ""
          });
        });
    }

    this.closeChannelForm();
  }

  addMessageToChannel(msg) {
    const LIMIT = 100;
    const { channels } = this.state;
    const channel = channels[msg.name];

    if (!channel) {
      return this.setState({
        hasError: true
      });
    }

    channel.msgs.push(msg);
    if (channel.msgs.length > LIMIT) {
      channel.msgs = channel.msgs.slice(channel.msgs.length - LIMIT);
    }

    return this.setState({
      channels: {
        ...channels,
        [channel.name]: {
          ...channel
        }
      }
    });
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

  handleChannelInput(e) {
    this.setState({
      channelInput: e.target.value
    });
  }

  handleChange(e) {
    this.hc(e, "messageInput");
  }

  handleDisplayNameInputChange(e) {
    this.hc(e, "displayNameInput");
  }

  handleSubmit(e) {
    if (e.which === 13 && !e.shiftKey) {
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
      channelInput,
      isChannelFormOpen,
      isChannelFormInvalid,
      channelFormErrorMsg,
      selectedChannel
    } = this.state;

    const $channelForm = isChannelFormOpen ? (
      <div className={stylesLayout.overlay}>
        <button
          className={stylesLayout["close-btn"]}
          type="button"
          onClick={this.closeChannelForm}
        >
          <SvgClose />
          close
        </button>
        <ChannelForm
          value={channelInput}
          onCreateBtnClick={this.createChannel}
          onChange={this.handleChannelInput}
          onBlur={this.handleChannelInputBlur}
          isInvalid={isChannelFormInvalid}
          errorMsg={channelFormErrorMsg}
        />
      </div>
    ) : null;

    return (
      <div className={stylesLayout["chat-app"]}>
        {$channelForm}
        {this.renderDisplayNameForm()}
        <Sidebar>
          <SidebarHeader username={displayName} />
          <section>
            <ChannelHeader title="Channels">
              <button
                type="submit"
                onClick={this.openChannelForm}
                className={stylesLayout.iconBtn}
              >
                <PlusIcon height={15} width={15} />
              </button>
            </ChannelHeader>
            {
              <Channels
                title="Channels"
                items={channels}
                active={selectedChannel.name}
              />
            }
          </section>
          <Logo height={25} width={25} fill="#9696a1" />
        </Sidebar>
        <main className={stylesLayout.main}>
          <SiteHeader channelName={selectedChannel.name} />
          <Switch>
            <Route path="/" exact component={this.renderMessages} />
            <Route path="/channels/:id" component={this.renderMessages} />
          </Switch>
          <form action="" className={stylesLayout["chat-form"]}>
            <Input
              id="m"
              type="submit"
              autoComplete="off"
              placeholder="Type a message"
              label="Send message"
              value={messageInput}
              onChange={this.handleChange}
              onKeyPress={this.handleSubmit}
            />
          </form>
        </main>
      </div>
    );
  }
}

export default withRouter(Chat);
