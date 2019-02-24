import React from "react";
import PropTypes from "prop-types";
import styles from "./sidebarHeader.css";

const Username = ({ username }) => (
  <h1 className={styles.username}>{username}</h1>
);

function SidebarHeader({ username }) {
  return (
    <header className={styles.sidebarHeader}>
      <Username username={username} />
    </header>
  );
}

SidebarHeader.propTypes = {
  username: PropTypes.string.isRequired
};

export default SidebarHeader;
