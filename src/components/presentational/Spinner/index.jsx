import React from "react";
import styles from "./spinner.css";

function Spinner() {
  return (
    <div className={styles["lds-spinner"]} data-testid="spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Spinner;
