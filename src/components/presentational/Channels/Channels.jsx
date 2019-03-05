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

function Channels({ items, title, active, children, ...attr }) {
  return (
    <section>
      <ChannelHeader title={title}>{children}</ChannelHeader>
      <ChannelList channels={items} {...attr} activeChannel={active} />
    </section>
  );
}

Channels.propTypes = {
  active: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default Channels;
