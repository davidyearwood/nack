import React from "react";
import PropTypes from "prop-types";
import CircleIcon from "../Svg/CircleIcon";
import styles from "./userStatus.css";

const STATUS = {
  offline: "#ff3232",
  online: "#00CC00"
};

function OnlineStatus({ width, height, status }) {
  return (
    <div className={styles.status}>
      <CircleIcon
        fill={STATUS[status.toLowerCase()] || STATUS.online}
        width={width}
        height={height}
      />
    </div>
  );
}

OnlineStatus.defaultProps = {
  status: "online"
};

OnlineStatus.propTypes = {
  status: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default OnlineStatus;
