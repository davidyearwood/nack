import React from "react";
import PropTypes from "prop-types";
import styles from "./channelHeader.css";

function ChannelHeader({ title, children }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  );
}

ChannelHeader.defaultProps = {
  children: null
};

ChannelHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ChannelHeader;
