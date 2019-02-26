import React from "react";
import PropTypes from "prop-types";
import ChatIcon from "../Svg/ChatIcon";
import styles from "./logo.css";

function Logo({ height, width, fill }) {
  return (
    <h1 className={styles.logo}>
      <ChatIcon height={height} width={width} fill={fill} />
      <span className={styles.logoName}>Nack</span>
    </h1>
  );
}

export default Logo;
