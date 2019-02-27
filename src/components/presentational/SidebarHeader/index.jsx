import React from "react";
import PropTypes from "prop-types";
import styles from "./sidebarHeader.css";
import UserStatus from "../UserStatus";

const Username = ({ username }) => (
  <h1 className={styles.username}>{username}</h1>
);

function SidebarHeader({ username, status }) {
  return (
    <header className={styles.sidebarHeader}>
      <UserStatus height={10} width={10} status={status} />
      <Username username={username} />
    </header>
  );
}

SidebarHeader.propTypes = {
  username: PropTypes.string.isRequired,
  status: PropTypes.string
};

export default SidebarHeader;
