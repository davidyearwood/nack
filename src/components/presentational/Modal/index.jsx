import React, { Component } from "react";
import PropTypes from "prop-types";
import SvgClose from "../Svg/SvgClose";
import styles from "./modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    const { show } = this.props;
    this.state = {
      show
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      show: false
    });
  }

  render() {
    const { show } = this.state;
    const { children } = this.props;

    if (show) {
      return (
        <div className={styles.modal}>
          <button
            className={styles.btn}
            type="button"
            onClick={this.closeModal}
          >
            <SvgClose />
            close
          </button>
          {children}
        </div>
      );
    }

    return null;
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired
};

export default Modal;
