import React from "react";
import PropTypes from "prop-types";
import styles from "./button.css";

// Helper
const joinClassNames = (str, classNames) => classNames.concat(str).join(" ");

function Button({ text, classNames, type, children, ...attr }) {
  return (
    <button
      type={type}
      className={joinClassNames(styles.btn, classNames)}
      {...attr}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  classNames: []
};

Button.propTypes = {
  type: PropTypes.string,
  classNames: PropTypes.arrayOf(PropTypes.string)
};

export default Button;
