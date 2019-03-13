import React from "react";
import PropTypes from "prop-types";
import styles from "./messageForm.css";
import Input from "../Input";
import FileUpload from "../FileUpload";

function MessageForm({ onSubmit, value, onChange, onFileChange }) {
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
      <FileUpload onChange={onFileChange} />
    </form>
  );
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired
};

export default MessageForm;
