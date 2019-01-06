import React from "react";
import PropTypes from "prop-types";
import styles from "./channels.css";
// import { Link } from "react-router-dom";

const ChannelHeader = ({ title }) => (
  <header className={styles["channels-header"]}>
    <h1 className={styles["channels-header__title"]}>{title}</h1>
  </header>
);

function ChannelList({ items }) {
  const $items = items.map(item => (
    <li key={item.id} className={styles["channels-list__item"]}>
      <a className={styles["channels-list__link"]} href={item.to}>
        {item.name}
      </a>
    </li>
  ));

  return <ul className={styles["channels-list"]}>{$items}</ul>;
}

function Channels({ title, items }) {
  return (
    <div className={styles.channels}>
      <ChannelHeader title={title} />
      <ChannelList items={items} />
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
