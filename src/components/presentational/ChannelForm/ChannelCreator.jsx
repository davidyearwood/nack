import React, { Component } from "react";
import PropTypes from "prop-types";
import ChannelForm from "./ChannelForm";

class ChannelCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      errorMsg: "",
      isInvalid: false,
      isPushing: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      isPushing: true
    });
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
    const { input, errorMsg, isInvalid, isPushing } = this.state;
    // renders some form
    return (
      <ChannelForm
        value={input}
        onChange={this.handleChange}
        errorMsg={errorMsg}
        isInvalid={isInvalid}
        isPushing={isPushing}
        onCreateBtnClick={this.handleClick}
      />
    );
  }
}

ChannelCreator.defaultProps = {
  channels: []
};
export default ChannelCreator;
