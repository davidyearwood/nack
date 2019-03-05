import React from "react";
import PropTypes from "prop-types";
import styles from "./iconButton.css";

function IconButton({ icon, type, onClick, ...attr }) {
  return (
    <button type={type} className={styles.iconButton} onClick={onClick}>
      {icon}
    </button>
  );
}

IconButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default IconButton;
