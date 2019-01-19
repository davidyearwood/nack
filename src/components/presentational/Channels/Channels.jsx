import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./channels.css";

const ChannelHeader = ({ title }) => (
  <header className={styles["channels-header"]}>
    <h1 className={styles["channels-header__title"]}>{title}</h1>
  </header>
);

function ChannelList({ items }) {
  const $items = items.map(item => (
    <li key={item} className={styles["channels-list__item"]}>
      <Link to={`/channels/${item}`} className={styles["channels-list__link"]}>
        {item}
      </Link>
    </li>
  ));

  return <ul className={styles["channels-list"]}>{$items}</ul>;
}

function Channels({ title, items, ...attr }) {
  return (
    <div className={styles.channels}>
      <ChannelHeader title={title} />
      <ChannelList items={items} {...attr} />
    </div>
  );
}

ChannelHeader.propTypes = {
  title: PropTypes.string
};

ChannelHeader.defaultProps = {
  title: ""
};

ChannelList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

ChannelList.defaultProps = {
  items: []
};

Channels.defaultProps = {
  title: "",
  items: []
};

Channels.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default Channels;
