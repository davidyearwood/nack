import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Channels.css";

const getClassNames = (channelName, activeChannel) =>
  channelName === activeChannel
    ? `${styles.active} ${styles.channel}`
    : styles.channel;

function ChannelHeader({ title, children }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.channelsTitle}>{title}</h1>
      {children}
    </header>
  );
}

function ChannelList({ channels, activeChannel, ...attr }) {
  // channels { [id] }
  const channelNames = Object.keys(channels).map(channelId => {
    const key = channels[channelId].id;
    return (
      <li key={key} className={getClassNames(channelId, activeChannel)}>
        <Link
          to={{
            pathname: `/channels/${channelId}`,
            state: { id: channelId, name: channels[channelId].name }
          }}
          className={styles.channelLink}
          {...attr}
        >
          {channels[channelId].name}
        </Link>
      </li>
    );
  });

  return <ul className={styles.channels}>{channelNames}</ul>;
}

function Channels({ items, title, active, children, ...attr }) {
  return (
    <section>
      <ChannelHeader title={title}>{children}</ChannelHeader>
      <ChannelList channels={items} {...attr} activeChannel={active} />
    </section>
  );
}

Channels.defaultProps = {
  active: ""
};

Channels.propTypes = {
  active: PropTypes.string,
  title: PropTypes.string.isRequired
};
export default Channels;
