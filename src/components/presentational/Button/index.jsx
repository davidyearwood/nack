import React from "react";
import PropTypes from "prop-types";
import styles from "./button.css";

function Button({ text, classNames, type, ...attr }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${classNames.join(" ")}`}
      {...attr}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  classNames: []
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string)
};

export default Button;
