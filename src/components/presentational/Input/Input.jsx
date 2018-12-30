import React from "react";
import PropTypes from "prop-types";
import styles from "./input.css";

const Input = ({ text, id, type, value, ...attr }) => (
  <input
    aria-label={text}
    type={type}
    className={styles.inputField}
    id={id}
    value={value}
    required
    {...attr}
  />
);

Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Input;
