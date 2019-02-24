import React from "react";
import PropTypes from "prop-types";
import styles from "./siteHeader.css";

const ChannelName = ({ title }) => (
  <h1 className={styles.channelName}>{title}</h1>
);
const UserName = ({ userName }) => (
  <span className={styles["user-name__text"]}>{userName}</span>
);

function SiteHeader({ channelName }) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.container}>
        <ChannelName title={channelName} />
      </div>
    </header>
  );
}

SiteHeader.propTypes = {
  channelName: PropTypes.string.isRequired
};

export default SiteHeader;
