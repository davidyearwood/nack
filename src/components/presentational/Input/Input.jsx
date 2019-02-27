import React from "react";
import PropTypes from "prop-types";
import styles from "./input.css";

const Input = ({ label, id, type, value, ...attr }) => (
  <input
    aria-label={label}
    type={type}
    className={styles.inputField}
    id={id}
    value={value}
    required
    {...attr}
  />
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Input;
