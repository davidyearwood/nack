import React from "react";
import PropTypes from "prop-types";

function SubmitIcon({ height, width, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={height}
      width={width}
      fill={fill}
    >
      <path d="m476 3.2-463.5 267.4c-18.1 10.4-15.8 35.6 2.2 43.2l106.3 44.6 287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3l-240.9 293.5v80.5c0 23.6 28.5 32.9 42.5 15.8l63.5-77.3 124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432c3.4-20.2-18.3-34.8-35.6-24.8z" />
    </svg>
  );
}

SubmitIcon.defaultProps = {
  fill: "#000"
};

SubmitIcon.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  fill: PropTypes.string
};
export default SubmitIcon;
