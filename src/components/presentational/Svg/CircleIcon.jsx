import React from "react";
import PropTypes from "prop-types";

function CircleIcon({ height, width, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={height}
      width={width}
      fill={fill}
    >
      <path d="m256 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248z" />
    </svg>
  );
}

CircleIcon.defaultProps = {
  fill: "#fff"
};

CircleIcon.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  fill: PropTypes.string
};

export default CircleIcon;
