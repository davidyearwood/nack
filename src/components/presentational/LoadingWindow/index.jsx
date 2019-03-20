import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import styles from "./loadingWindow.css";

function LoadingWindow() {
  return (
    <div className={`${styles.center} ${styles.bg}`}>
      <div className={styles.center}>
        <Spinner />
        <h1 className={styles.title}>Does Anyone Actually Read This?</h1>
      </div>
    </div>
  );
}

export default LoadingWindow;
