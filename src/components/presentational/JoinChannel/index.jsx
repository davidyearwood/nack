import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import styles from "./joinChannel.css";
import Button from "../Button";

function JoinChannel({ channelName, user, date, ...attr }) {
  return (
    <div className={styles.container}>
      <p className={styles.info}>
        You are viewing{" "}
        <span className={styles.channelName}>{channelName}</span>
      </p>
      <span className={styles.creator}>
        Created by {user} on {date}
      </span>
      <Button {...attr} type="submit" text="Join Channel" />
    </div>
  );
}

export default JoinChannel;
