import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ChannelForm from "./ChannelForm";

// user clicks
// spinner starts
// if success
// modal window closes
class ChannelCreator extends Component {
  constructor(props) {
    super(props);
    const { show } = this.props;
    this.state = {
      input: "",
      errorMsg: "",
      isInvalid: false,
      isPushing: false,
      show
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const input = this.state;
    const username = this.props;

    this.setState({
      isPushing: true
    });

    fetch("/api/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: input, creator: username })
    })
      .then(res => res.json())
      .then(
        res => {
          if (res.statusCode === 201) {
            this.setState({
              isPushing: false,
              input: "",
              show: false
            });
          } else {
            throw new Error(`HTTP Status Code: ${res.statusCode}`);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  handleChange(e) {
    const { channels } = this.props;

    if (!channels.includes(e.target.value)) {
      this.setState({
        input: e.target.value,
        isInvalid: false
      });
    } else {
      this.setState({
        input: e.target.value,
        errorMsg: "Channel name already exists",
        isInvalid: true
      });
    }
  }

  render() {
    const { input, errorMsg, isInvalid, isPushing, show } = this.state;

    return (
      <Modal show={show}>
        <ChannelForm
          value={input}
          onChange={this.handleChange}
          errorMsg={errorMsg}
          isInvalid={isInvalid}
          isPushing={isPushing}
          onCreateBtnClick={this.handleClick}
        />
      </Modal>
    );
  }
}

ChannelCreator.defaultProps = {
  show: true,
  channels: []
};

ChannelCreator.propTypes = {
  username: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.string),
  show: PropTypes.bool
};

export default ChannelCreator;
