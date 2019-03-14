import React from "react";
import PropTypes from "prop-types";
import ImageIcon from "../Svg/ImageIcon";
import styles from "./fileUpload.css";

function FileUpload({ onChange }) {
  return (
    <span className={styles.container}>
      <label htmlFor="fileUpload" className={styles.label}>
        <ImageIcon width={27.65} height={27.65} fill="gray" />
      </label>
      <input
        id="fileUpload"
        type="file"
        className={styles.inputFile}
        aria-label="Upload an image, jpeg and png only"
        onChange={onChange}
      />
    </span>
  );
}

export default FileUpload;
