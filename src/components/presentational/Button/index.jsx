import React from "react";
import PropTypes from "prop-types";
import styles from "./button.css";

const joinClassNames = (str, classNames) => classNames.concat(str).join(" ");

function Button({ text, classNames, type, ...attr }) {
  return (
    <button
      type={type}
      className={joinClassNames(styles.btn, classNames)}
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
