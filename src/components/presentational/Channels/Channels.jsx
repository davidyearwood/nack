import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChannelItem = items => {
  items.map(item => (
    <li className="channels__list-item">
      <Link className="channels__link" to={`/${items.to}/`}>
        {item.text}
      </Link>
    </li>
  ));
};

function Channels({ items, header }) {
  return (
    <div className="channels">
      <h3 className="channels__title">{header}</h3>
      <ul className="channels__list">{ChannelItem(items)}</ul>
    </div>
  );
}

export default Channels;
