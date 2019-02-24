import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./channels.css";

const ChannelHeader = ({ title }) => (
  <header className={styles["channels-header"]}>
    <h1 className={styles["channels-header__title"]}>{title}</h1>
  </header>
);

function ChannelList({ channels, ...attr }) {
  const channelsNames = Object.keys(channels);

  const $items = channelsNames.map(channelName => (
    <li
      key={channels[channelName].id}
      className={styles["channels-list__item"]}
    >
      <Link
        to={{
          pathname: `/channels/${channelName}`,
          state: { id: channels[channelName].id, name: channelName }
        }}
        className={styles["channels-list__link"]}
        {...attr}
      >
        {channelName}
      </Link>
    </li>
  ));

  return <ul className={styles["channels-list"]}>{$items}</ul>;
}

function Channels({ title, items, ...attr }) {
  return (
    <div className={styles.channels}>
      <ChannelList channels={items} {...attr} />
    </div>
  );
}

export default Channels;
