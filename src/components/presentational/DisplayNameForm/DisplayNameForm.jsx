import React, { Component } from "react";
import SvgUser from "../Svg/SvgUser";
import Modal from "../Modal";
import styles from "./displayNameForm.css";
import functional from "../../../styles/functional.css";
import Button from "../Button";

const Header = ({ title }) => (
  <div className={styles.header}>
    <SvgUser height="4em" width="4em" />
    <h2 className={styles.title}>{title}</h2>
  </div>
);

class Container extends Component {
  constructor(props) {
    super(props);

    const { show } = this.props;

    this.state = {
      username: "",
      input: "",
      show
    };

    this.setUsername = this.setUsername.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setUsername() {
    const { input } = this.state;

    if (input) {
      this.setState({
        username: input,
        input: ""
      });

      this.rememberName();
    }
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  rememberName() {
    const { input } = this.state;

    if (input) {
      localStorage.setItem("username", input);
    }
  }

  render() {
    const { show } = this.state;

    return (
      <DisplayNameForm
        onClick={this.setUsername}
        show={show}
        onChange={this.handleChange}
      />
    );
  }
}
function DisplayNameForm({ onClick, show, ...attr }) {
  return (
    <Modal show={show}>
      <div className={styles.container}>
        <Header title="What's your display name?" />
        <input
          type="text"
          className={styles.input}
          placeholder="e.g., David, n00bKing, etc..."
          {...attr}
        />
        <p className={styles.text}>
          This could be your first name, or a nickname — however you’d like
          people to refer to you in Nack.
        </p>
        <div className={functional.centerText}>
          <Button onClick={onClick}>Use Display Name</Button>
        </div>
      </div>
    </Modal>
  );
}

export default DisplayNameForm;
