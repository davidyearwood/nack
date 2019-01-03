import React from "react";
import styles from "./button.css";

function Button({ text, classNames = [], ...attr }) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${classNames.join(" ")}`}
      {...attr}
    >
      {text}
    </button>
  );
}

export default Button;
