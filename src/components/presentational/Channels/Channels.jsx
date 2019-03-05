import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Channels.css";

const getClassNames = (channelName, activeChannel) =>
  channelName === activeChannel
    ? `${styles.active} ${styles.channel}`
    : styles.channel;

function ChannelList({ channels, activeChannel, ...attr }) {
  const channelNames = Object.keys(channels).map(channelName => {
    const key = channels[channelName].id;
    return (
      <li key={key} className={getClassNames(channelName, activeChannel)}>
        <Link
          to={{
            pathname: `/channels/${channelName}`,
            state: { id: channels[channelName].id, name: channelName }
          }}
          className={styles.channelLink}
          {...attr}
        >
          {channelName}
        </Link>
      </li>
    );
  });

  return <ul className={styles.channels}>{channelNames}</ul>;
}

function Channels({ items, active, ...attr }) {
  return <ChannelList channels={items} {...attr} activeChannel={active} />;
}

Channels.propTypes = {
  active: PropTypes.string.isRequired
};
export default Channels;
