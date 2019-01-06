import React from "react";
import styles from "./sidebar.css";

function Sidebar({ children }) {
  return <aside className={styles.sidebar}>{children}</aside>;
}

export default Sidebar;
