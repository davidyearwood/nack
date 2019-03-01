import React, { Component } from "react";
import PropTypes from "prop-types";
import ChannelForm from "./ChannelForm";

class ChannelCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    const { input } = this.state;
    // renders some form
    return <ChannelForm value={input} onChange={this.handleChange} />;
  }
}

export default ChannelCreator;
