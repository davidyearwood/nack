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
import Channels from "../presentational/Channels/Channels";
import Sidebar from "../presentational/Sidebar/Sidebar";
import ChannelForm from "../presentational/ChannelForm/ChannelForm";
import SvgClose from "../presentational/Svg/SvgClose";
import SiteHeader from "../presentational/SiteHeader";
import SidebarHeader from "../presentational/SidebarHeader";
import PlusIcon from "../presentational/Svg/PlusIcon";
import Logo from "../presentational/Logo";
import IconButton from "../presentational/IconButton";
import MessageForm from "../presentational/MessageForm";
import postChannel from "../../../helper/postChannel";

const Loading = () => <div>Retrieving channels! Hang tight.</div>;
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
class Chat extends Component {
  constructor(props) {
    super(props);
    this.endpoint = "http://localhost:3000";
    this.socket = io(this.endpoint);
    // selectedChannel { id: String, name: String }
    this.state = {
      selectedChannel: {
        id: "",
        name: ""
      },
      loading: true,
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
    this.handleFileUpload = this.handleFileUpload.bind(this);
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
                [cv.id]: {
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

          return channels;
        },
        error => console.log(error)
      )
      .then(channels => {
        // 1. I want to check to see if the selectedChannel state has values that are not null
        // 2. I want to check to see if there's a selected channel stored inside of the user's local storage
        // 3. If both failed, then set the user's selectedChannel to the first one retrieved among the list of channels.
        let selectedChannel = JSON.parse(
          localStorage.getItem("lastChannelSelected")
        );

        if (!selectedChannel) {
          // set state to this and be done with it.
          const firstChannelId = Object.keys(channels)[0]; // retrieve the first channel ID
          selectedChannel = channels[firstChannelId];

          console.log(firstChannelId);
        }

        if (selectedChannel) {
          this.changeUrlPath(`/channels/${selectedChannel.id}`, {
            id: selectedChannel.id,
            name: selectedChannel.name
          });
        }

        // add selected channel
        this.setState({
          selectedChannel: {
            name: selectedChannel.name,
            id: selectedChannel.id
          },
          loading: false
        });
      });

    // Add messages to the state
    this.socket.on("chat message", msg => {
      this.addMessageToChannel(msg);
    });

    this.socket.on("new channel", channel => {
      const { channels } = this.state;

      this.setState({
        channels: {
          ...channels,
          [channel.id]: channel
        }
      });
    });

    this.socket.on("uploadFile", file => {
      // const fr = new FileReader();
      // fr.addEventListener("loadend", () => {
      //   console.log("file upload");
      //   console.log(fr.result);
      // });
      // fr.readAsArrayBuffer(fileApi);
    });

    // check to see if local storage has a display name already
    const displayName = localStorage.getItem("displayName");
    if (displayName) {
      this.setState({
        displayName,
        isDisplayNameOpen: false
      });
    }

    // update selected channel when the route changes
    const { history } = this.props;
    this.unlistenToHistory = history.listen(location => {
      const { id, name } = location.state;
      if (id && name) {
        this.setState({
          selectedChannel: {
            id,
            name
          }
        });
        localStorage.setItem(
          "lastChannelSelected",
          JSON.stringify({ id, name })
        );
      }
    });
  }

  componentWillUnmount() {
    this.unlistenToHistory();
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

  handleFileUpload(e) {
    const { messageInput, selectedChannel, displayName } = this.state;
    const file = e.target.files[0];
    const fr = new FileReader();
    const FILE_SIZE_LIMIT = 5000000;
    if (file.size > FILE_SIZE_LIMIT) {
      console.log(`Exceeded ${FILE_SIZE_LIMIT}`);
      return false;
    }

    fr.addEventListener("loadend", () => {
      const message = createMessage(
        displayName,
        fr.result,
        selectedChannel.id,
        "image"
      );
      this.socket.emit("chat message", message);
    });

    fr.readAsArrayBuffer(file);

    return true;
  }

  createChannel() {
    const {
      displayName,
      channelInput,
      channels,
      isChannelFormInvalid
    } = this.state;

    if (!isChannelFormInvalid) {
      postChannel(JSON.stringify({ name: channelInput, creator: displayName }))
        .then(
          res => {
            if (res.status === 201) {
              return res.json();
            }

            throw new Error(`Status Code ${res.status}`);
          },
          error => console.log(error)
        )
        .then(
          res => {
            const newChannel = Object.assign({}, res.data);

            this.setState({
              channels: {
                ...channels,
                [newChannel.id]: newChannel
              },
              channelInput: ""
            });

            this.socket.emit("new channel", newChannel);
            this.closeChannelForm();
          },
          error => console.log(error)
        );
    }
  }

  addMessageToChannel(msg) {
    const LIMIT = 100;
    const { channels } = this.state;
    const channel = channels[msg.channelId];

    if (!channel) {
      return this.setState({
        hasError: true
      });
    }

    channel.msgs.push(msg);
    if (channel.msgs.length > LIMIT) {
      channel.msgs.shift();
    }

    return this.setState({
      channels: {
        ...channels,
        [channel.id]: {
          ...channel
        }
      }
    });
  }

  changeUrlPath(path, state = {}) {
    const { history } = this.props;
    history.replace(path, state);
  }

  _hc(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleChannelInput(e) {
    this._hc(e, "channelInput");
  }

  handleChange(e) {
    this._hc(e, "messageInput");
  }

  handleDisplayNameInputChange(e) {
    this._hc(e, "displayNameInput");
  }

  handleSubmit(e) {
    e.preventDefault();
    const { messageInput, selectedChannel, displayName } = this.state;
    const message = createMessage(
      displayName,
      messageInput,
      selectedChannel.id,
      "text"
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
          show={isDisplayNameOpen}
        />
      );
    }

    return null;
  }

  renderMessages({ match }) {
    const { channels, isLoaded, selectedChannel } = this.state;

    const channelId = match.path === "/" ? selectedChannel.id : match.params.id;

    if (isLoaded) {
      return <Messages msgs={channels[channelId].msgs} />;
    }

    return null;
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
      selectedChannel,
      isLoaded,
      loading,
      isDisplayNameOpen
    } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (isDisplayNameOpen) {
      return this.renderDisplayNameForm();
    }

    if (isChannelFormOpen) {
      return (
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
      );
    }

    return (
      <div className={stylesLayout.chatApplication}>
        <Sidebar>
          <SidebarHeader username={displayName} />
          <Channels
            items={channels}
            active={selectedChannel.name}
            title="Channels"
          >
            <IconButton
              onClick={this.openChannelForm}
              type="submit"
              icon={<PlusIcon height={15} width={15} />}
            />
          </Channels>
          <Logo height={25} width={25} fill="#9696a1" />
        </Sidebar>
        <main className={stylesLayout.main}>
          <SiteHeader channelName={selectedChannel.name} />
          <Switch>
            <Route path="/" exact component={this.renderMessages} />
            <Route path="/channels/:id" component={this.renderMessages} />
          </Switch>
          <MessageForm
            onSubmit={this.handleSubmit}
            value={messageInput}
            onChange={this.handleChange}
            onFileChange={this.handleFileUpload}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(Chat);
