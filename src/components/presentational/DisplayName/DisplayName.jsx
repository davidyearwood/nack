import React from "react";
import PropTypes from "prop-types";
import styles from "./displayName.css";

function DisplayName({ userName = "" }) {
  return (
    <div className={styles["display-name"]}>
      <h1 className={styles["display-name__logo"]}>Nack</h1>
      <h2 className={styles["display-name__user-name"]}>{userName}</h2>
    </div>
  );
}

DisplayName.propTypes = {
  userName: PropTypes.string.isRequired
};

export default DisplayName;
