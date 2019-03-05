import React from "react";
import PropTypes from "prop-types";
import styles from "./messageForm.css";
import Input from "../Input";

function MessageForm({ onSubmit, value, onChange }) {
  return (
    <form action="" className={styles.messageForm} onSubmit={onSubmit}>
      <Input
        id="m"
        type="text"
        autoComplete="off"
        placeholder="Type a message"
        label="Send message"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MessageForm;
