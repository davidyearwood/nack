import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import styles from "./loadingWindow.css";

function LoadingWindow({ message }) {
  return (
    <div className={`${styles.center} ${styles.bg}`}>
      <div className={styles.center}>
        <Spinner />
        <h1 className={styles.title}>{message}</h1>
      </div>
    </div>
  );
}

export default LoadingWindow;
